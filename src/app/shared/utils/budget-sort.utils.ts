import { Budget } from '../../models/budget.model';

export type SortField = 'name' | 'date' | 'price';
export type SortOrder = 'asc' | 'desc';

export function sortBudgets(budgets: Budget[], field: SortField, order: SortOrder): Budget[] {
  return [...budgets].sort((a, b) => {
    let comparison: number;
    switch (field) {
      case 'name':
        comparison = a.clientName.localeCompare(b.clientName);
        break;
      case 'date':
        comparison = a.date - b.date;
        break;
      case 'price':
        comparison = a.totalPrice - b.totalPrice;
        break;
    }
    return order === 'asc' ? comparison : -comparison;
  });
}
