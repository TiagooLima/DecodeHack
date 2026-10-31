import type { HTMLAttributes } from 'react';
import { cn } from '@/lib/cn';

type Size = 'narrow' | 'wide' | 'full';

interface PageContainerProps extends HTMLAttributes<HTMLDivElement> {
  /** narrow: cards (~448px) | wide: hero (~768px) | full: header (~1152px) */
  size?: Size;
}

const sizes: Record<Size, string> = {
  narrow: 'max-w-md',
  wide: 'max-w-3xl',
  full: 'max-w-6xl',
};

/** Centraliza o conteúdo, limita a largura e dá o respiro lateral. Sem lógica nem estado. */
export function PageContainer({ size = 'narrow', className, ...props }: PageContainerProps) {
  return <div className={cn('mx-auto w-full px-4 sm:px-6', sizes[size], className)} {...props} />;
}
