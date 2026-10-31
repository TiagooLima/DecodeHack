type ClassValue = string | false | null | undefined;

/** Junta classes ignorando valores falsos. */
export function cn(...classes: ClassValue[]): string {
  return classes.filter(Boolean).join(' ');
}
