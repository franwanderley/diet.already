'use client'

interface FooterProps {
  onCtaClick: () => void
  showCta: boolean
}

export function Footer({ onCtaClick, showCta }: FooterProps) {
  return (
    <footer className="border-t border-slate-200 dark:border-border-dark bg-white dark:bg-card-dark py-12 px-4 transition-colors duration-300">
      <div className="mx-auto max-w-4xl text-center flex flex-col items-center">
        {showCta && (
          <div className="mb-12 max-w-xl">
            <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white mb-3">
              Comece a Transformar Sua Saúde Hoje
            </h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm mb-6">
              Junte-se a milhares de pessoas que alcançaram seus objetivos
              físicos de forma sustentável, saudável e inteligente com dietas de
              precisão alimentadas por IA.
            </p>
            <button
              onClick={onCtaClick}
              className="px-8 py-4 bg-gradient-to-r from-primary to-primary-dark hover:from-primary hover:to-secondary text-white font-bold rounded-xl shadow-lg hover:shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 cursor-pointer"
            >
              Criar Minha Dieta Personalizada
            </button>
          </div>
        )}
        <div className="flex flex-col sm:flex-row justify-between items-center w-full gap-4 pt-6 border-t border-slate-100 dark:border-border-dark/60 text-xs text-slate-400">
          <div>
            &copy; {new Date().getFullYear()} Diet.already. Todos os direitos
            reservados.
          </div>
          <div className="flex gap-4">
            <a href="#" className="hover:text-primary transition-colors">
              Termos de Uso
            </a>
            <a href="#" className="hover:text-primary transition-colors">
              Política de Privacidade
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
