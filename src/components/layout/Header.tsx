import { ChartColumn, Landmark, Moon, Sun } from 'lucide-react';
import { useTheme } from '../../features/decoder/hooks/useTheme'; 

function ThemeToggle() {
  const { dark, toggle } = useTheme();

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={dark ? 'Mudar para o tema claro' : 'Mudar para o tema escuro'}
      title={dark ? 'Tema claro' : 'Tema escuro'}
      className="grid size-9 place-items-center rounded-lg border border-border bg-surface-2 text-text-secondary transition ease cursor-pointer hover:text-text focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-text-secondary"
    >
      {dark ? <Sun size={16} aria-hidden /> : <Moon size={16} aria-hidden />}
    </button>
  );
}

export function Header() {
  return (
    <header className="border-b border-border bg-bg">
      <div className="mx-auto grid h-16 max-w-6xl grid-cols-[1fr_auto_1fr] items-center px-4 sm:px-6 lg:px-10">
        {/* Logo */}
        <a
          href="/"
          className="flex w-fit items-center gap-2.5 rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-text-secondary"
        >
          <span className="grid size-7 place-items-center rounded-lg bg-primary text-primary-text">
            <ChartColumn size={16} strokeWidth={2.25} aria-hidden />
          </span>
          <span className="text-lg font-medium tracking-tight text-text">
            Decode<span className="text-text-secondary">Hack</span>
          </span>
        </a>

        {/* Navegação central */}
        <nav aria-label="Principal" className="hidden md:block">
          <a
            href="/"
            aria-current="page"
            className="flex items-center gap-2 rounded-md text-xs text-text-secondary transition ease-in hover:text-text focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-text-secondary"
          >
            <Landmark size={14} aria-hidden />
            Decodificações
          </a>
        </nav>

        {/* Ações à direita */}
        <div className="col-start-3 flex items-center justify-end gap-3 sm:gap-4 ">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
