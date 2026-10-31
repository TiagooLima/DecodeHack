import type { HTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/cn';

/** Container arredondado dos blocos "Decodificação" e "Resultado". */
export function Card({ className, ...props }: HTMLAttributes<HTMLElement>) {
  return (
    <section
      className={cn('rounded-3xl border border-border bg-surface p-6 sm:p-7', className)}
      {...props}
    />
  );
}

interface CardHeaderProps {
  /** Ícone dentro do tile (ex.: <Wallet size={18} />) */
  icon: ReactNode;
  /** Nome da seção, ex.: "Decodificação" */
  label: string;
  /** Linha de apoio abaixo do nome */
  description?: string;
}

/** Linha superior do card: tile de ícone + nome da seção + descrição curta. */
export function CardHeader({ icon, label, description }: CardHeaderProps) {
  return (
    <div className="flex items-center gap-3">
      <span
        aria-hidden
        className="grid size-10 shrink-0 place-items-center rounded-xl border border-border bg-surface-2 text-text"
      >
        {icon}
      </span>
      <div className="min-w-0">
        <p className="text-[10px] font-semibold uppercase leading-4 tracking-[0.18em] text-text">
          {label}
        </p>
        {description && <p className="text-xs leading-4 text-text-muted">{description}</p>}
      </div>
    </div>
  );
}

interface CardTitleProps {
  children: ReactNode;
  /** Texto menor abaixo do título */
  description?: string;
  /** Nível do heading, para não quebrar a hierarquia da página */
  as?: 'h2' | 'h3';
}

/** Título grande do card com descrição opcional. */
export function CardTitle({ children, description, as: Heading = 'h2' }: CardTitleProps) {
  return (
    <div className="mt-8">
      <Heading className="text-xl font-medium leading-snug tracking-tight text-text sm:text-2xl">
        {children}
      </Heading>
      {description && <p className="mt-3 text-xs leading-5 text-text-muted">{description}</p>}
    </div>
  );
}
