export interface QuestionnaireData {
  name: string
  gender: 'male' | 'female'
  goal: 'lose' | 'gain' | 'maintain'
  age: number
  weight: number
  height: number
  activityLevel:
    | 'sedentary'
    | 'lightly_active'
    | 'moderately_active'
    | 'very_active'
  restrictions: string[]
  nonNegotiable: string
}

export interface Meal {
  name: string
  time: string
  foods: string[]
}

export interface DietPlan {
  calories: number
  tmb?: number
  nct?: number
  macros: {
    protein: number
    carbs: number
    fat: number
  }
  meals: Meal[]
  recommendations: string[]
}
