import { QuestionnaireData } from '../types'

export interface DietMetrics {
  tmb: number
  nct: number
  calories: number
  protein: number
  fat: number
  carbs: number
}

export function calculateDietMetrics(data: QuestionnaireData): DietMetrics {
  const { gender, weight, height, age, activityLevel, goal } = data

  // Mifflin-St Jeor Equation
  let tmb = 0
  if (gender === 'male') {
    tmb = 10 * weight + 6.25 * height - 5 * age + 5
  } else {
    tmb = 10 * weight + 6.25 * height - 5 * age - 161
  }

  // Physical Activity Level Multiplier
  let activityMultiplier = 1.2
  switch (activityLevel) {
    case 'sedentary':
      activityMultiplier = 1.2
      break
    case 'lightly_active':
      activityMultiplier = 1.375
      break
    case 'moderately_active':
      activityMultiplier = 1.55
      break
    case 'very_active':
      activityMultiplier = 1.725
      break
  }

  const nct = tmb * activityMultiplier

  // Target Calories Adjustment based on Goal
  let calories = nct
  if (goal === 'lose') {
    calories = nct - 400
  } else if (goal === 'gain') {
    calories = nct + 400
  }

  // Macronutrient Calculations:
  // - Protein: 2g per kg of body weight
  // - Fat: 1g per kg of body weight
  // - Carbs: Remaining calories divided by 4 (1g carb = 4 kcal)
  const protein = 2 * weight
  const fat = 1 * weight
  const carbs = Math.max(0, (calories - (protein * 4 + fat * 9)) / 4)

  return {
    tmb: Math.round(tmb),
    nct: Math.round(nct),
    calories: Math.round(calories),
    protein: Math.round(protein),
    fat: Math.round(fat),
    carbs: Math.round(carbs),
  }
}
