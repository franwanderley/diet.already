'use client'

import { useState } from 'react'
import { Hero } from './components/Hero'
import { Benefits } from './components/Benefits'
import { Questionnaire } from './components/Questionnaire'
import { DietResult } from './components/DietResult'
import { Footer } from './components/Footer'
import { DietPlan, QuestionnaireData } from './types'

export default function Home() {
  const [showForm, setShowForm] = useState(false)
  const [diet, setDiet] = useState<DietPlan | null>(null)
  const [questionnaireData, setQuestionnaireData] =
    useState<QuestionnaireData | null>(null)

  const handleStart = () => {
    setShowForm(true)
    setTimeout(() => {
      document
        .getElementById('questionnaire')
        ?.scrollIntoView({ behavior: 'smooth' })
    }, 100)
  }

  const handleSuccess = (plan: DietPlan, data: QuestionnaireData) => {
    setDiet(plan)
    setQuestionnaireData(data)
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }, 100)
  }

  const handleReset = () => {
    setDiet(null)
    setQuestionnaireData(null)
    setShowForm(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-bg-dark text-text-light dark:text-text-dark transition-colors duration-300">
      <header className="sticky top-0 z-50 border-b border-slate-200/80 dark:border-border-dark/80 bg-white/80 dark:bg-bg-dark/80 backdrop-blur-xl transition-colors duration-300">
        <div className="mx-auto max-w-6xl px-4 py-4 flex justify-between items-center">
          <button
            className="flex items-center gap-2 cursor-pointer focus:outline-none"
            onClick={handleReset}
            type="button"
          >
            <span className="h-8 w-8 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-black text-lg">
              D
            </span>
            <span className="font-black text-xl tracking-tight bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              diet.already
            </span>
          </button>
          <div>
            <button
              onClick={handleStart}
              className="px-4 py-2 text-xs font-bold text-primary border border-primary/20 bg-primary/5 hover:bg-primary/10 rounded-lg transition-all duration-300 cursor-pointer"
            >
              Criar Dieta
            </button>
          </div>
        </div>
      </header>

      <main className="grow">
        {diet && questionnaireData ? (
          <DietResult
            diet={diet}
            questionnaire={questionnaireData}
            onReset={handleReset}
          />
        ) : (
          <>
            <Hero onStart={handleStart} />
            <Benefits />
            {showForm && <Questionnaire onSuccess={handleSuccess} />}
          </>
        )}
      </main>

      <Footer onCtaClick={handleStart} showCta={!diet} />
    </div>
  )
}
