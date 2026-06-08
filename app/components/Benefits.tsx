'use client'

export function Benefits() {
  return (
    <section
      id="benefits"
      className="py-20 px-4 bg-slate-50 dark:bg-card-dark/20 border-y border-slate-100 dark:border-border-dark"
    >
      <div className="mx-auto max-w-6xl">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl text-slate-900 dark:text-white">
            Por que ter uma Dieta Estruturada é Essencial?
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-700 dark:text-slate-200">
            Seja qual for o seu objetivo, a nutrição é responsável por 80% dos
            seus resultados. Entenda como um plano personalizado faz a
            diferença:
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          <div className="p-8 sm:p-10 rounded-2xl border border-slate-200/60 dark:border-border-dark bg-white dark:bg-card-dark hover:border-secondary/40 dark:hover:border-secondary/40 transition-all duration-300 shadow-xl flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center justify-center p-3 rounded-xl bg-secondary/15 text-secondary-dark dark:text-secondary mb-6 font-bold text-sm">
                Foco em Queima de Gordura
              </div>
              <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white mb-6">
                Vantagens para Perda de Peso
              </h3>
              <ul className="space-y-5 text-left text-slate-700 dark:text-slate-200">
                <li className="flex items-start gap-3">
                  <div className="p-1 rounded-full bg-secondary/10 text-secondary shrink-0 mt-0.5">
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <div>
                    <strong className="text-slate-950 dark:text-slate-200">
                      Preservação de Massa Magra:
                    </strong>{' '}
                    Um bom aporte proteico garante a perda exclusiva de gordura,
                    mantendo seus músculos tonificados.
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="p-1 rounded-full bg-secondary/10 text-secondary shrink-0 mt-0.5">
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <div>
                    <strong className="text-slate-950 dark:text-slate-200">
                      Controle Real da Fome:
                    </strong>{' '}
                    A seleção inteligente de alimentos volumosos e ricos em
                    fibras aumenta a saciedade, evitando episódios de compulsão.
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="p-1 rounded-full bg-secondary/10 text-secondary shrink-0 mt-0.5">
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <div>
                    <strong className="text-slate-950 dark:text-slate-200">
                      Melhora Metabólica:
                    </strong>{' '}
                    Regulação da sensibilidade à insulina e controle dos níveis
                    de açúcar no sangue, otimizando a energia diária.
                  </div>
                </li>
              </ul>
            </div>
            <div className="mt-8 border-t border-slate-100 dark:border-border-dark pt-6 text-sm italic text-slate-600 dark:text-slate-300">
              * O déficit calórico controlado evita a fadiga crônica e o efeito
              sanfona.
            </div>
          </div>

          <div className="p-8 sm:p-10 rounded-2xl border border-slate-200/60 dark:border-border-dark bg-white dark:bg-card-dark hover:border-primary/40 dark:hover:border-primary/40 transition-all duration-300 shadow-xl flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center justify-center p-3 rounded-xl bg-primary/15 text-primary-dark dark:text-primary mb-6 font-bold text-sm">
                Foco em Construção Muscular
              </div>
              <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white mb-6">
                Vantagens para Ganho de Massa
              </h3>
              <ul className="space-y-5 text-left text-slate-700 dark:text-slate-200">
                <li className="flex items-start gap-3">
                  <div className="p-1 rounded-full bg-primary/10 text-primary shrink-0 mt-0.5">
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <div>
                    <strong className="text-slate-950 dark:text-slate-200">
                      Hipertrofia Acelerada:
                    </strong>{' '}
                    Distribuição calórica e proteica planejada para manter o
                    balanço de nitrogênio positivo e facilitar a síntese
                    muscular.
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="p-1 rounded-full bg-primary/10 text-primary shrink-0 mt-0.5">
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <div>
                    <strong className="text-slate-950 dark:text-slate-200">
                      Densidade Energética Saudável:
                    </strong>{' '}
                    Refeições estrategicamente desenhadas para bater a meta de
                    superávit sem sobrecarregar o sistema digestivo.
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="p-1 rounded-full bg-primary/10 text-primary shrink-0 mt-0.5">
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <div>
                    <strong className="text-slate-950 dark:text-slate-200">
                      Performance e Recuperação:
                    </strong>{' '}
                    Estoques de glicogênio sempre cheios, garantindo treinos
                    mais pesados e menor tempo de recuperação.
                  </div>
                </li>
              </ul>
            </div>
            <div className="mt-8 border-t border-slate-100 dark:border-border-dark pt-6 text-sm italic text-slate-600 dark:text-slate-300">
              * O superávit calórico limpo maximiza ganhos musculares
              minimizando ganho de gordura.
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
