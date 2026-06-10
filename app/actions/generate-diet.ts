'use server'

import { QuestionnaireData, DietPlan } from '../types'
import { calculateDietMetrics } from '../utils/calculations'

const GOAL_MAPPING = {
  lose: 'perda de peso (déficit calórico)',
  gain: 'ganho de peso/massa muscular (superávit calórico)',
  maintain: 'manutenção de peso saudável (balanço calórico neutro)',
}

const ACTIVITY_LEVEL_MAPPING = {
  sedentary: 'sedentário (pouco ou nenhum exercício)',
  lightly_active: 'levemente ativo (exercício leve 1-3 dias/semana)',
  moderately_active: 'moderadamente ativo (exercício moderado 3-5 dias/semana)',
  very_active: 'muito ativo (exercício intenso 6-7 dias/semana)',
}

export async function generateDiet(data: QuestionnaireData): Promise<DietPlan> {
  const apiKey = process.env.GEMINI_API_KEY
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY is not defined')
  }

  const metrics = calculateDietMetrics(data)

  const goalText = GOAL_MAPPING[data.goal]

  const activityText = ACTIVITY_LEVEL_MAPPING[data.activityLevel]

  const restrictionsText =
    data.restrictions.length > 0
      ? data.restrictions.join(', ')
      : 'nenhuma restrição alimentar'

  const nonNegotiableText = data.nonNegotiable || 'nenhum'

  const prompt = `Você é um nutricionista profissional renomado. Crie uma dieta personalizada em português baseado nestes dados do cliente:
- Nome: ${data.name}
- Gênero: ${data.gender === 'male' ? 'Masculino' : 'Feminino'}
- Idade: ${data.age} anos
- Objetivo: ${goalText}
- Peso atual: ${data.weight} kg
- Altura: ${data.height} cm
- Nível de atividade física: ${activityText}
- Restrições alimentares: ${restrictionsText}
- Alimento/bebida que não abre mão de jeito nenhum: ${nonNegotiableText}

Métricas Energéticas Calculadas (use estes valores exatos como base):
- Taxa Metabólica Basal (TMB): ${metrics.tmb} kcal
- Necessidade Calórica Total (NCT): ${metrics.nct} kcal
- Meta Calórica Diária (Objetivo): ${metrics.calories} kcal

Distribuição Recomendada de Macronutrientes (use estes valores exatos como base):
- Proteínas: ${metrics.protein}g (2g/kg de peso)
- Gorduras: ${metrics.fat}g (1g/kg de peso)
- Carboidratos: ${metrics.carbs}g (sobra das calorias)

Instruções importantes:
1. Monte o plano alimentar detalhado de refeições diárias (incluindo horários ideais sugeridos e alimentos) guiando-se pela Meta Calórica Diária de ${metrics.calories} kcal e pelos macros recomendados acima. (Atenção: você NÃO precisa ser matematicamente rigoroso com os alimentos nas refeições para atingir exatamente esses valores).
2. Se o cliente especificou um alimento ou bebida que não abre mão (diferente de "nenhum"), tente encaixá-lo de forma moderada e controlada na dieta (se viável), e obrigatoriamente inclua uma recomendação ou crítica construtiva/orientação nutricional no array de 'recommendations' detalhando o impacto dele na saúde/dieta e como consumi-lo corretamente.
3. Forneça recomendações de hidratação corretas baseadas no peso do cliente e suplementação se relevante.
4. No JSON retornado, preencha o campo 'calories' exatamente com o valor ${metrics.calories}, e o objeto 'macros' com exatamente os valores de proteína: ${metrics.protein}, carboidratos: ${metrics.carbs} e gorduras: ${metrics.fat}.`

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: prompt,
              },
            ],
          },
        ],
        generationConfig: {
          responseMimeType: 'application/json',
          responseSchema: {
            type: 'OBJECT',
            properties: {
              calories: { type: 'INTEGER' },
              macros: {
                type: 'OBJECT',
                properties: {
                  protein: { type: 'INTEGER' },
                  carbs: { type: 'INTEGER' },
                  fat: { type: 'INTEGER' },
                },
                required: ['protein', 'carbs', 'fat'],
              },
              meals: {
                type: 'ARRAY',
                items: {
                  type: 'OBJECT',
                  properties: {
                    name: { type: 'STRING' },
                    time: { type: 'STRING' },
                    foods: {
                      type: 'ARRAY',
                      items: { type: 'STRING' },
                    },
                  },
                  required: ['name', 'time', 'foods'],
                },
              },
              recommendations: {
                type: 'ARRAY',
                items: { type: 'STRING' },
              },
            },
            required: ['calories', 'macros', 'meals', 'recommendations'],
          },
        },
      }),
    },
  )

  if (!response.ok) {
    throw new Error('Failed to generate diet from Gemini API')
  }

  const responseData = await response.json()
  const text = responseData.candidates?.[0]?.content?.parts?.[0]?.text

  if (!text) {
    throw new Error('Empty response from Gemini API')
  }

  const dietPlan: DietPlan = JSON.parse(text)
  return {
    ...dietPlan,
    tmb: metrics.tmb,
    nct: metrics.nct,
    calories: metrics.calories,
    macros: {
      protein: metrics.protein,
      fat: metrics.fat,
      carbs: metrics.carbs,
    },
  }
}
