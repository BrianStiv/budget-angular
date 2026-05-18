import { Budget } from '../../models/budget.model';

export function filterBudgets(budgets: Budget[], searchTerm: string): Budget[] {
  const term = searchTerm.toLowerCase();
  if (!term) return [...budgets];
  return budgets.filter(
    (b) =>
      b.clientName.toLowerCase().includes(term) ||
      b.clientEmail.toLowerCase().includes(term) ||
      b.clientPhone.includes(term),
  );
}
