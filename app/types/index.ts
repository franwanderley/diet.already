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

export interface FoodItem {
  name: string
  amount: string
  alternatives?: { name: string; amount: string }[]
}

export interface Meal {
  name: string
  time: string
  foods: FoodItem[]
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
