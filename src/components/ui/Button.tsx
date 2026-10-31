import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
import { cn } from '@/lib/cn';

type Variant = 'primary' | 'secondary' | 'ghost';
type Size = 'sm' | 'md';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** primary: ação principal e item ativo | secondary: item inativo | ghost: ação discreta */
  variant?: Variant;
  size?: Size;
  fullWidth?: boolean;
  /** Ícone exibido depois do texto (ex.: seta do "Decodificar") */
  iconRight?: ReactNode;
  /** Ícone exibido antes do texto */
  iconLeft?: ReactNode;
}

const variants: Record<Variant, string> = {
  primary: 'bg-primary text-primary-text border border-transparent hover:opacity-90',
  secondary:
    'bg-surface-2 text-text-secondary border border-border hover:text-text hover:border-border-strong',
  ghost: 'bg-transparent text-text-secondary border border-transparent hover:text-text hover:bg-surface-2',
};

const sizes: Record<Size, string> = {
  sm: 'h-9 px-3 text-xs rounded-lg gap-1.5',
  md: 'h-11 px-4 text-sm rounded-xl gap-2',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    variant = 'primary',
    size = 'md',
    fullWidth = false,
    iconLeft,
    iconRight,
    className,
    type = 'button',
    children,
    ...props
  },
  ref,
) {
  return (
    <button
      ref={ref}
      type={type}
      className={cn(
        'inline-flex items-center justify-center font-medium transition-[color,background-color,border-color,opacity] duration-150',
        'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-text-secondary',
        'disabled:pointer-events-none disabled:opacity-50',
        variants[variant],
        sizes[size],
        fullWidth && 'w-full',
        className,
      )}
      {...props}
    >
      {iconLeft}
      {children}
      {iconRight}
    </button>
  );
});
