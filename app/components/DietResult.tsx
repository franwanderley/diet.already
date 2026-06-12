'use client'

import { useState } from 'react'
import { DietPlan, QuestionnaireData, FoodItem } from '../types'

interface DietResultProps {
  readonly diet: DietPlan
  readonly questionnaire: QuestionnaireData
  readonly onReset: () => void
}

const GOAL_MAPPED_NAME = {
  lose: 'Emagrecimento',
  gain: 'Hipertrofia',
  maintain: 'Manutenção',
}

export function DietResult({ diet, questionnaire, onReset }: DietResultProps) {
  const [selections, setSelections] = useState<
    Record<string, { name: string; amount: string }>
  >({})

  const handlePrint = () => {
    globalThis.print()
  }

  const dailyHydration = Math.round(questionnaire.weight * 35)

  return (
    <section className="py-12 px-4 max-w-4xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8">
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            Seu Plano Alimentar está Pronto!
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Gerado com precisão para {questionnaire.name}.
          </p>
        </div>
        <div className="flex gap-3 w-full sm:w-auto">
          <button
            onClick={onReset}
            className="flex-1 sm:flex-initial px-5 py-3 border border-slate-200 dark:border-border-dark text-slate-700 dark:text-slate-300 font-bold rounded-xl hover:bg-slate-50 dark:hover:bg-slate-950 transition-all duration-300 cursor-pointer"
          >
            Refazer Questionário
          </button>
          <button
            onClick={handlePrint}
            className="flex-1 sm:flex-initial px-6 py-3 bg-linear-to-r from-primary to-secondary text-white font-bold rounded-xl shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 cursor-pointer flex items-center justify-center gap-2"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            Exportar PDF
          </button>
        </div>
      </div>

      <div
        id="print-area"
        className="bg-white dark:bg-card-dark rounded-3xl border border-slate-200 dark:border-border-dark shadow-2xl p-6 sm:p-10 space-y-10"
      >
        <div className="border-b border-slate-100 dark:border-border-dark pb-8 text-center sm:text-left flex flex-col sm:flex-row justify-between items-center gap-6">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">
              Dieta Inteligente
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Plano Alimentar de Alta Precisão Personalizado
            </p>
          </div>
          <div className="grid grid-cols-2 gap-x-6 gap-y-1 text-xs text-slate-500 dark:text-slate-400 border-t sm:border-t-0 sm:border-l border-slate-100 dark:border-border-dark pt-4 sm:pt-0 sm:pl-6">
            <div>
              <strong>Cliente:</strong> {questionnaire.name}
            </div>
            <div>
              <strong>Idade:</strong> {questionnaire.age} anos
            </div>
            <div>
              <strong>Peso atual:</strong> {questionnaire.weight} kg
            </div>
            <div>
              <strong>Altura:</strong> {questionnaire.height} cm
            </div>
            <div>
              <strong>Gênero:</strong>{' '}
              {questionnaire.gender === 'male' ? 'Masculino' : 'Feminino'}
            </div>
            <div>
              <strong>Objetivo:</strong> {GOAL_MAPPED_NAME[questionnaire.goal]}
            </div>
          </div>
        </div>

        {/* Métricas Energéticas */}
        {(diet.tmb || diet.nct) && (
          <div className="bg-slate-50/50 dark:bg-slate-950/20 p-6 rounded-3xl border border-slate-100 dark:border-border-dark/60 space-y-4">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span className="h-5 w-1 bg-linear-to-b from-primary to-secondary rounded-full" />
              <span>Métricas Energéticas</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-white dark:bg-card-dark p-5 rounded-2xl border border-slate-100 dark:border-border-dark text-center">
                <div className="text-xs text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider">
                  Taxa Metabólica Basal (TMB)
                </div>
                <div className="text-2xl font-black text-slate-900 dark:text-white mt-1">
                  {diet.tmb} kcal
                </div>
                <div className="text-[10px] text-slate-400 dark:text-slate-500 mt-1">
                  Energia mínima gasta em repouso
                </div>
              </div>
              <div className="bg-white dark:bg-card-dark p-5 rounded-2xl border border-slate-100 dark:border-border-dark text-center">
                <div className="text-xs text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider">
                  Necessidade Calórica Total (NCT)
                </div>
                <div className="text-2xl font-black text-slate-900 dark:text-white mt-1">
                  {diet.nct} kcal
                </div>
                <div className="text-[10px] text-slate-400 dark:text-slate-500 mt-1">
                  Energia gasta incluindo atividade física
                </div>
              </div>
              <div className="bg-linear-to-br from-primary/5 to-secondary/5 dark:from-primary/10 dark:to-secondary/10 p-5 rounded-2xl border border-primary/20 dark:border-secondary/20 text-center">
                <div className="text-xs text-primary dark:text-secondary font-bold uppercase tracking-wider">
                  Meta da Dieta ({GOAL_MAPPED_NAME[questionnaire.goal]})
                </div>
                <div className="text-2xl font-black text-slate-950 dark:text-white mt-1">
                  {diet.calories} kcal
                </div>
                <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-1">
                  {questionnaire.goal === 'lose' &&
                    'Déficit calórico (-400 kcal)'}
                  {questionnaire.goal === 'gain' &&
                    'Superávit calórico (+400 kcal)'}
                  {questionnaire.goal === 'maintain' &&
                    'Balanço calórico neutro'}
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="grid sm:grid-cols-4 gap-4">
          <div className="bg-slate-50 dark:bg-slate-950 p-6 rounded-2xl border border-slate-100 dark:border-border-dark text-center">
            <div className="text-xs text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider">
              Calorias Diárias
            </div>
            <div className="text-3xl font-black text-slate-900 dark:text-white mt-1">
              {diet.calories} kcal
            </div>
          </div>
          <div className="bg-slate-50 dark:bg-slate-950 p-6 rounded-2xl border border-slate-100 dark:border-border-dark text-center">
            <div className="text-xs dark:text-slate-400 font-bold uppercase tracking-wider text-primary">
              Proteínas
            </div>
            <div className="text-3xl font-black text-slate-900 dark:text-white mt-1">
              {diet.macros.protein}g
            </div>
          </div>
          <div className="bg-slate-50 dark:bg-slate-950 p-6 rounded-2xl border border-slate-100 dark:border-border-dark text-center">
            <div className="text-xs dark:text-slate-400 font-bold uppercase tracking-wider text-secondary">
              Carboidratos
            </div>
            <div className="text-3xl font-black text-slate-900 dark:text-white mt-1">
              {diet.macros.carbs}g
            </div>
          </div>
          <div className="bg-slate-50 dark:bg-slate-950 p-6 rounded-2xl border border-slate-100 dark:border-border-dark text-center">
            <div className="text-xs dark:text-slate-400 font-bold uppercase tracking-wider text-accent">
              Gorduras
            </div>
            <div className="text-3xl font-black text-slate-900 dark:text-white mt-1">
              {diet.macros.fat}g
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <span className="h-5 w-1 bg-primary rounded-full" />
            <span>Cronograma de Refeições</span>
          </h3>
          <div className="relative border-l border-slate-100 dark:border-border-dark ml-3 pl-6 space-y-8">
            {diet.meals.map((meal, idx) => (
              <div key={`${meal.name}-${idx}`} className="relative">
                <span className="absolute -left-7.75 top-1.5 flex h-4.5 w-4.5 rounded-full border-4 border-white dark:border-card-dark bg-primary" />
                <div className="bg-slate-50/50 dark:bg-slate-950/30 p-5 rounded-2xl border border-slate-100 dark:border-border-dark/60">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-3">
                    <h4 className="font-bold text-slate-900 dark:text-white text-base">
                      {meal.name}
                    </h4>
                    <span className="px-3 py-1 bg-slate-100 dark:bg-border-dark rounded-full text-xs font-bold text-slate-700 dark:text-slate-300">
                      Horário Sugerido: {meal.time}
                    </span>
                  </div>
                  <ul className="divide-y divide-slate-100/50 dark:divide-border-dark/30 text-sm text-slate-700 dark:text-slate-200">
                    {meal.foods.map((foodItem, fidx) => {
                      const food = foodItem as unknown as string | FoodItem
                      const isString = typeof food === 'string'
                      const originalName = isString ? food : food.name
                      const originalAmount = isString ? '' : food.amount
                      const alternatives = isString
                        ? []
                        : food.alternatives || []
                      const selectionKey = `${idx}-${fidx}`
                      const currentFood = selections[selectionKey] || {
                        name: originalName,
                        amount: originalAmount,
                      }
                      const hasAlternatives = alternatives.length > 0

                      return (
                        <li
                          key={`${meal.name}-${fidx}`}
                          className="py-3 first:pt-0 last:pb-0 flex flex-col gap-2"
                        >
                          <div className="flex items-start gap-2">
                            <span className="h-1.5 w-1.5 rounded-full bg-primary shrink-0 mt-1.75" />
                            <div className="flex flex-wrap items-center gap-x-2">
                              <span className="font-semibold text-slate-900 dark:text-white">
                                {currentFood.name}
                              </span>
                              {currentFood.amount && (
                                <span className="text-xs text-primary font-bold bg-primary/10 dark:bg-primary/5 px-2 py-0.5 rounded-md">
                                  {currentFood.amount}
                                </span>
                              )}
                            </div>
                          </div>

                          {hasAlternatives && (
                            <div className="pl-3.5 flex flex-wrap items-center gap-1.5 mt-1 select-none print:hidden">
                              <span className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider">
                                Opções:
                              </span>
                              <button
                                type="button"
                                onClick={() => {
                                  const updated = { ...selections }
                                  delete updated[selectionKey]
                                  setSelections(updated)
                                }}
                                className={`px-2 py-1 rounded-lg text-xs font-bold transition-all duration-200 cursor-pointer ${
                                  currentFood.name === originalName
                                    ? 'bg-primary text-white shadow-xs'
                                    : 'bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800'
                                }`}
                              >
                                {originalName}
                              </button>
                              {alternatives.map((alt, altIdx) => (
                                <button
                                  type="button"
                                  key={`${alt.name}-${altIdx}`}
                                  onClick={() => {
                                    setSelections((prev) => ({
                                      ...prev,
                                      [selectionKey]: {
                                        name: alt.name,
                                        amount: alt.amount,
                                      },
                                    }))
                                  }}
                                  className={`px-2 py-1 rounded-lg text-xs font-bold transition-all duration-200 cursor-pointer ${
                                    currentFood.name === alt.name
                                      ? 'bg-primary text-white shadow-xs'
                                      : 'bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800'
                                  }`}
                                >
                                  {alt.name}
                                </button>
                              ))}
                            </div>
                          )}

                          {hasAlternatives && (
                            <div className="hidden print:block pl-3.5 text-[10px] text-slate-400 italic">
                              Opções:{' '}
                              {[
                                originalName === currentFood.name
                                  ? null
                                  : `${originalName} (${originalAmount})`,
                                ...alternatives
                                  .filter(
                                    (alt) => alt.name !== currentFood.name,
                                  )
                                  .map((alt) => `${alt.name} (${alt.amount})`),
                              ]
                                .filter(Boolean)
                                .join(', ')}
                            </div>
                          )}
                        </li>
                      )
                    })}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-8 border-t border-slate-100 dark:border-border-dark pt-8">
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span className="h-5 w-1 bg-secondary rounded-full" />
              <span>Metas de Hidratação</span>
            </h3>
            <div className="bg-slate-50 dark:bg-slate-950 p-5 rounded-2xl border border-slate-100 dark:border-border-dark flex items-center gap-4">
              <div className="p-3 rounded-xl bg-secondary/10 text-secondary">
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 9.172V5L8 4z"
                  />
                </svg>
              </div>
              <div>
                <div className="text-xs text-slate-500 dark:text-slate-400 font-bold uppercase">
                  Água por Dia
                </div>
                <div className="text-xl font-black text-slate-900 dark:text-white mt-0.5">
                  {dailyHydration} ml
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span className="h-5 w-1 bg-accent rounded-full" />
              <span>Recomendações Extras</span>
            </h3>
            <ul className="space-y-2 text-sm text-slate-700 dark:text-slate-200">
              {diet.recommendations.map((recommendation, idx) => (
                <li
                  key={`${recommendation}-${idx}`}
                  className="flex items-start gap-2"
                >
                  <span className="p-0.5 rounded-full bg-accent/15 text-accent shrink-0 mt-0.5">
                    <svg
                      className="h-3 w-3"
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
                  </span>
                  <span>{recommendation}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
