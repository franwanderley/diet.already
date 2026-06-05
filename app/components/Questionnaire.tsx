'use client'

import { SubmitEvent, useState } from 'react'
import { QuestionnaireData, DietPlan } from '../types'
import { generateDiet } from '../actions/generate-diet'

interface QuestionnaireProps {
  readonly onSuccess: (diet: DietPlan, questionnaire: QuestionnaireData) => void
}

export function Questionnaire({ onSuccess }: QuestionnaireProps) {
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [loadingMessage, setLoadingMessage] = useState('')
  const [formData, setFormData] = useState<QuestionnaireData>({
    name: '',
    gender: 'male',
    goal: 'lose',
    age: 25,
    weight: 70,
    height: 170,
    activityLevel: 'moderately_active',
    restrictions: [],
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const totalSteps = 5

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }
  }

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    const numValue = value === '' ? 0 : Number(value)
    setFormData((prev) => ({ ...prev, [name]: numValue }))
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }
  }

  const selectGoal = (goal: 'lose' | 'gain' | 'maintain') => {
    setFormData((prev) => ({ ...prev, goal }))
  }

  const selectGender = (gender: 'male' | 'female') => {
    setFormData((prev) => ({ ...prev, gender }))
  }

  const selectActivity = (
    activityLevel:
      | 'sedentary'
      | 'lightly_active'
      | 'moderately_active'
      | 'very_active',
  ) => {
    setFormData((prev) => ({ ...prev, activityLevel }))
  }

  const toggleRestriction = (restriction: string) => {
    setFormData((prev) => {
      const exists = prev.restrictions.includes(restriction)
      const updated = exists
        ? prev.restrictions.filter((r) => r !== restriction)
        : [...prev.restrictions, restriction]
      return { ...prev, restrictions: updated }
    })
  }

  const validateStep = () => {
    const currentErrors: Record<string, string> = {}

    if (step === 1) {
      if (!formData.name.trim()) {
        currentErrors.name = 'Por favor, digite seu nome.'
      }
    } else if (step === 3) {
      if (formData.age <= 0 || formData.age > 120) {
        currentErrors.age = 'Digite uma idade válida.'
      }
      if (formData.weight <= 20 || formData.weight > 300) {
        currentErrors.weight = 'Digite um peso válido (kg).'
      }
      if (formData.height <= 50 || formData.height > 250) {
        currentErrors.height = 'Digite uma altura válida (cm).'
      }
    }

    setErrors(currentErrors)
    return Object.keys(currentErrors).length === 0
  }

  const nextStep = () => {
    if (validateStep()) {
      setStep((prev) => Math.min(prev + 1, totalSteps))
    }
  }

  const prevStep = () => {
    setStep((prev) => Math.max(prev - 1, 1))
  }

  const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!validateStep()) return

    setLoading(true)
    setLoadingMessage('Calculando suas taxas metabólicas...')

    const timer1 = setTimeout(() => {
      setLoadingMessage('Configurando distribuição de macronutrientes...')
    }, 2000)

    const timer2 = setTimeout(() => {
      setLoadingMessage('IA estruturando cardápio alimentar completo...')
    }, 4500)

    try {
      const generated = await generateDiet(formData)
      onSuccess(generated, formData)
    } catch {
      alert('Ocorreu um erro ao gerar a dieta. Tente novamente mais tarde.')
    } finally {
      clearTimeout(timer1)
      clearTimeout(timer2)
      setLoading(false)
    }
  }

  const progressPercentage = (step / totalSteps) * 100

  return (
    <section
      id="questionnaire"
      className="py-20 px-4 max-w-2xl mx-auto scroll-mt-10"
    >
      <div className="bg-white dark:bg-card-dark rounded-3xl border border-slate-200 dark:border-border-dark shadow-2xl p-6 sm:p-10 relative overflow-hidden">
        {loading ? (
          <div className="py-16 flex flex-col items-center justify-center text-center">
            <div className="relative flex items-center justify-center mb-8">
              <span className="absolute inline-flex h-16 w-16 rounded-full bg-primary/20 animate-ping" />
              <div className="h-12 w-12 rounded-full border-4 border-slate-200 dark:border-border-dark border-t-primary dark:border-t-primary animate-spin" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
              Gerando seu Plano Personalizado
            </h3>
            <p className="text-slate-600 dark:text-slate-300 text-sm animate-pulse">
              {loadingMessage}
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="mb-8">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-bold text-primary dark:text-secondary uppercase tracking-wider">
                  Passo {step} de {totalSteps}
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400 font-semibold">
                  {Math.round(progressPercentage)}% concluído
                </span>
              </div>
              <div className="w-full bg-slate-100 dark:bg-border-dark h-2 rounded-full overflow-hidden">
                <div
                  className="bg-linear-to-r from-primary to-secondary h-full rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
            </div>

            {step === 1 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                    Como podemos chamar você?
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">
                    Insira seu nome e gênero para personalizarmos sua
                    experiência.
                  </p>
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="name"
                    className="text-sm font-bold text-slate-800 dark:text-slate-200"
                  >
                    Seu nome
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    value={formData.name}
                    onChange={handleTextChange}
                    placeholder="Ex: João"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-border-dark bg-slate-50 dark:bg-slate-950 focus:bg-white dark:focus:bg-black focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all duration-300 text-slate-900 dark:text-white"
                  />
                  {errors.name && (
                    <span className="text-xs text-red-500 font-semibold">
                      {errors.name}
                    </span>
                  )}
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="male"
                    className="text-sm font-bold text-slate-800 dark:text-slate-200"
                  >
                    Seu Gênero
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      type="button"
                      id="male"
                      onClick={() => selectGender('male')}
                      className={`py-4 rounded-xl border font-bold text-sm transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer ${
                        formData.gender === 'male'
                          ? 'border-primary bg-primary/5 text-primary'
                          : 'border-slate-200 dark:border-border-dark text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-950'
                      }`}
                    >
                      Masculino
                    </button>
                    <button
                      type="button"
                      onClick={() => selectGender('female')}
                      className={`py-4 rounded-xl border font-bold text-sm transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer ${
                        formData.gender === 'female'
                          ? 'border-primary bg-primary/5 text-primary'
                          : 'border-slate-200 dark:border-border-dark text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-950'
                      }`}
                    >
                      Feminino
                    </button>
                  </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                    Qual é o seu principal objetivo?
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">
                    Isso mudará radicalmente o cálculo de calorias e macros.
                  </p>
                </div>
                <div className="space-y-3">
                  <button
                    type="button"
                    onClick={() => selectGoal('lose')}
                    className={`w-full p-5 rounded-2xl border text-left transition-all duration-300 cursor-pointer ${
                      formData.goal === 'lose'
                        ? 'border-secondary bg-secondary/5 ring-1 ring-secondary'
                        : 'border-slate-200 dark:border-border-dark hover:bg-slate-50 dark:hover:bg-slate-950'
                    }`}
                  >
                    <div className="font-bold text-slate-900 dark:text-white">
                      Perder Peso (Emagrecimento)
                    </div>
                    <div className="text-xs text-slate-600 dark:text-slate-300 mt-1">
                      Foco em queima de gordura preservando massa magra.
                    </div>
                  </button>
                  <button
                    type="button"
                    onClick={() => selectGoal('gain')}
                    className={`w-full p-5 rounded-2xl border text-left transition-all duration-300 cursor-pointer ${
                      formData.goal === 'gain'
                        ? 'border-primary bg-primary/5 ring-1 ring-primary'
                        : 'border-slate-200 dark:border-border-dark hover:bg-slate-50 dark:hover:bg-slate-950'
                    }`}
                  >
                    <div className="font-bold text-slate-900 dark:text-white">
                      Ganhar Massa (Hipertrofia)
                    </div>
                    <div className="text-xs text-slate-600 dark:text-slate-300 mt-1">
                      Foco em construção muscular e ganho de força.
                    </div>
                  </button>
                  <button
                    type="button"
                    onClick={() => selectGoal('maintain')}
                    className={`w-full p-5 rounded-2xl border text-left transition-all duration-300 cursor-pointer ${
                      formData.goal === 'maintain'
                        ? 'border-slate-500 bg-slate-500/5 ring-1 ring-slate-500'
                        : 'border-slate-200 dark:border-border-dark hover:bg-slate-50 dark:hover:bg-slate-950'
                    }`}
                  >
                    <div className="font-bold text-slate-900 dark:text-white">
                      Manter Peso Saudável
                    </div>
                    <div className="text-xs text-slate-600 dark:text-slate-300 mt-1">
                      Foco em longevidade, reeducação alimentar e performance.
                    </div>
                  </button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                    Seus dados antropométricos
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">
                    Esses números definem suas taxas de metabolismo basal.
                  </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <label
                      htmlFor="age"
                      className="text-sm font-bold text-slate-800 dark:text-slate-200"
                    >
                      Idade (anos)
                    </label>
                    <input
                      type="number"
                      name="age"
                      id="age"
                      value={formData.age || ''}
                      onChange={handleNumberChange}
                      min="1"
                      max="120"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-border-dark bg-slate-50 dark:bg-slate-950 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all duration-300 text-slate-900 dark:text-white font-semibold"
                    />
                    {errors.age && (
                      <span className="text-xs text-red-500 font-semibold">
                        {errors.age}
                      </span>
                    )}
                  </div>
                  <div className="space-y-2">
                    <label
                      htmlFor="weight"
                      className="text-sm font-bold text-slate-800 dark:text-slate-200"
                    >
                      Peso (kg)
                    </label>
                    <input
                      type="number"
                      name="weight"
                      id="weight"
                      value={formData.weight || ''}
                      onChange={handleNumberChange}
                      min="20"
                      max="300"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-border-dark bg-slate-50 dark:bg-slate-950 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all duration-300 text-slate-900 dark:text-white font-semibold"
                    />
                    {errors.weight && (
                      <span className="text-xs text-red-500 font-semibold">
                        {errors.weight}
                      </span>
                    )}
                  </div>
                  <div className="space-y-2">
                    <label
                      htmlFor="height"
                      className="text-sm font-bold text-slate-800 dark:text-slate-200"
                    >
                      Altura (cm)
                    </label>
                    <input
                      type="number"
                      name="height"
                      id="height"
                      value={formData.height || ''}
                      onChange={handleNumberChange}
                      min="50"
                      max="250"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-border-dark bg-slate-50 dark:bg-slate-950 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all duration-300 text-slate-900 dark:text-white font-semibold"
                    />
                    {errors.height && (
                      <span className="text-xs text-red-500 font-semibold">
                        {errors.height}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                    Qual seu nível de atividade física?
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">
                    Seja realista para que o cálculo calórico seja exato.
                  </p>
                </div>
                <div className="space-y-3">
                  <button
                    type="button"
                    onClick={() => selectActivity('sedentary')}
                    className={`w-full p-4 rounded-xl border text-left transition-all duration-300 cursor-pointer ${
                      formData.activityLevel === 'sedentary'
                        ? 'border-primary bg-primary/5'
                        : 'border-slate-200 dark:border-border-dark hover:bg-slate-50 dark:hover:bg-slate-950'
                    }`}
                  >
                    <div className="font-bold text-sm text-slate-900 dark:text-white">
                      Sedentário
                    </div>
                    <div className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">
                      Fica sentado a maior parte do dia (ex: trabalho de
                      escritório).
                    </div>
                  </button>
                  <button
                    type="button"
                    onClick={() => selectActivity('lightly_active')}
                    className={`w-full p-4 rounded-xl border text-left transition-all duration-300 cursor-pointer ${
                      formData.activityLevel === 'lightly_active'
                        ? 'border-primary bg-primary/5'
                        : 'border-slate-200 dark:border-border-dark hover:bg-slate-50 dark:hover:bg-slate-950'
                    }`}
                  >
                    <div className="font-bold text-sm text-slate-900 dark:text-white">
                      Levemente Ativo
                    </div>
                    <div className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">
                      Exercícios leves ou caminhadas 1 a 3 dias por semana.
                    </div>
                  </button>
                  <button
                    type="button"
                    onClick={() => selectActivity('moderately_active')}
                    className={`w-full p-4 rounded-xl border text-left transition-all duration-300 cursor-pointer ${
                      formData.activityLevel === 'moderately_active'
                        ? 'border-primary bg-primary/5'
                        : 'border-slate-200 dark:border-border-dark hover:bg-slate-50 dark:hover:bg-slate-950'
                    }`}
                  >
                    <div className="font-bold text-sm text-slate-900 dark:text-white">
                      Moderadamente Ativo
                    </div>
                    <div className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">
                      Exercícios de intensidade média 3 a 5 dias por semana.
                    </div>
                  </button>
                  <button
                    type="button"
                    onClick={() => selectActivity('very_active')}
                    className={`w-full p-4 rounded-xl border text-left transition-all duration-300 cursor-pointer ${
                      formData.activityLevel === 'very_active'
                        ? 'border-primary bg-primary/5'
                        : 'border-slate-200 dark:border-border-dark hover:bg-slate-50 dark:hover:bg-slate-950'
                    }`}
                  >
                    <div className="font-bold text-sm text-slate-900 dark:text-white">
                      Muito Ativo
                    </div>
                    <div className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">
                      Exercícios intensos ou treinos pesados de 6 a 7 dias por
                      semana.
                    </div>
                  </button>
                </div>
              </div>
            )}

            {step === 5 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                    Possui alguma restrição alimentar?
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">
                    Marque todas as opções que se aplicam a você (opcional).
                  </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    'Vegano',
                    'Vegetariano',
                    'Sem Lactose',
                    'Sem Glúten',
                    'Sem Açúcar',
                    'Diabetes',
                    'Hipertensão',
                  ].map((restriction) => {
                    const isChecked =
                      formData.restrictions.includes(restriction)
                    return (
                      <button
                        type="button"
                        key={restriction}
                        onClick={() => toggleRestriction(restriction)}
                        className={`p-4 rounded-xl border font-bold text-sm text-left transition-all duration-300 flex items-center justify-between cursor-pointer ${
                          isChecked
                            ? 'border-accent bg-accent/5 text-accent'
                            : 'border-slate-200 dark:border-border-dark text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-950'
                        }`}
                      >
                        {restriction}
                        {isChecked && (
                          <svg
                            className="h-5 w-5 text-accent"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={3}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        )}
                      </button>
                    )
                  })}
                </div>
              </div>
            )}

            <div className="mt-8 pt-6 border-t border-slate-100 dark:border-border-dark flex justify-between gap-4">
              {step > 1 ? (
                <button
                  type="button"
                  onClick={prevStep}
                  className="px-6 py-3 border border-slate-200 dark:border-border-dark text-slate-700 dark:text-slate-200 font-bold rounded-xl hover:bg-slate-50 dark:hover:bg-slate-950 transition-all duration-300 cursor-pointer"
                >
                  Voltar
                </button>
              ) : (
                <div />
              )}

              {step < totalSteps ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="px-8 py-3 bg-primary hover:bg-primary-dark text-white font-bold rounded-xl shadow-md hover:shadow-primary/10 transition-all duration-300 cursor-pointer"
                >
                  Continuar
                </button>
              ) : (
                <button
                  type="submit"
                  className="px-8 py-3 bg-linear-to-r from-primary to-secondary text-white font-bold rounded-xl shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 cursor-pointer"
                >
                  Gerar Dieta por IA
                </button>
              )}
            </div>
          </form>
        )}
      </div>
    </section>
  )
}
