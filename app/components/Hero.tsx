'use client'

interface HeroProps {
  readonly onStart: () => void
}

export function Hero({ onStart }: HeroProps) {
  return (
    <section className="relative overflow-hidden py-20 px-4 text-center sm:py-32 bg-radial from-primary/10 via-transparent to-transparent">
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-size-[14px_24px]" />
      <div className="mx-auto max-w-4xl flex flex-col items-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-semibold mb-6 hover:bg-primary/10 transition-all duration-300">
          <span className="flex h-2 w-2 rounded-full bg-accent animate-pulse" />{' '}
          Tecnologia Alimentada por Inteligência Artificial
        </div>
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl text-slate-900 dark:text-white max-w-3xl leading-tight">
          Sua Dieta de Precisão Gerada por{' '}
          <span className="bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">
            Inteligência Artificial
          </span>
        </h1>
        <p className="mt-6 text-lg sm:text-xl text-slate-700 dark:text-slate-200 max-w-2xl">
          Chega de dietas genéricas. Obtenha um plano alimentar completo, com
          macronutrientes exatos e refeições práticas adaptadas à sua rotina e
          objetivos de saúde.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center w-full sm:w-auto">
          <button
            onClick={onStart}
            className="px-8 py-4 bg-linear-to-r from-primary to-primary-dark hover:from-primary hover:to-secondary text-white font-bold rounded-xl shadow-lg hover:shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 cursor-pointer"
          >
            Começar Minha Dieta Grátis
          </button>
          <a
            href="#benefits"
            className="px-8 py-4 bg-white/80 dark:bg-card-dark/80 hover:bg-white dark:hover:bg-card-dark border border-slate-200 dark:border-border-dark text-slate-800 dark:text-slate-100 font-semibold rounded-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 cursor-pointer flex items-center justify-center"
          >
            Ver Vantagens
          </a>
        </div>
        <div className="mt-16 w-full max-w-5xl rounded-2xl border border-slate-200 dark:border-border-dark bg-white/50 dark:bg-card-dark/50 p-2 backdrop-blur-xl shadow-2xl">
          <div className="rounded-xl border border-slate-200 dark:border-border-dark bg-white dark:bg-card-dark overflow-hidden flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-slate-100 dark:divide-border-dark">
            <div className="flex-1 p-6 sm:p-8 flex items-start gap-4 text-left">
              <div className="p-3 rounded-lg bg-primary/10 text-primary shrink-0">
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
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white text-base">
                  100% Personalizado
                </h3>
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-200">
                  Calculado especificamente para seu peso, altura, idade e nível
                  de atividade física.
                </p>
              </div>
            </div>
            <div className="flex-1 p-6 sm:p-8 flex items-start gap-4 text-left">
              <div className="p-3 rounded-lg bg-secondary/10 text-secondary shrink-0">
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
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white text-base">
                  Resultado em Segundos
                </h3>
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-200">
                  Nossa IA processa suas respostas instantaneamente e gera seu
                  plano alimentar na hora.
                </p>
              </div>
            </div>
            <div className="flex-1 p-6 sm:p-8 flex items-start gap-4 text-left">
              <div className="p-3 rounded-lg bg-accent/10 text-accent shrink-0">
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
                    d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white text-base">
                  Download em PDF
                </h3>
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-200">
                  Baixe sua dieta em formato PDF otimizado para impressão ou
                  leitura em qualquer dispositivo.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
