import { filterBudgets } from './budget-filter.utils';
import { Budget } from '../../models/budget.model';

function makeBudget(name: string, email: string): Budget {
  return {
    id: `test-${name}`,
    clientName: name,
    clientEmail: email,
    clientPhone: '123456789',
    selectedServices: [],
    totalPrice: 300,
    date: Date.now(),
  };
}

describe('filterBudgets', () => {
  const budgets: Budget[] = [
    makeBudget('Anna', 'anna@test.com'),
    makeBudget('John', 'john@test.com'),
    makeBudget('Jane', 'jane@test.com'),
  ];

  it('hauria de retornar tots els pressupostos si no hi ha terme de cerca', () => {
    expect(filterBudgets(budgets, '')).toEqual(budgets);
  });

  it('hauria de filtrar per nom', () => {
    const result = filterBudgets(budgets, 'anna');
    expect(result.length).toBe(1);
    expect(result[0].clientName).toBe('Anna');
  });

  it('hauria de filtrar per email', () => {
    const result = filterBudgets(budgets, 'john');
    expect(result.length).toBe(1);
    expect(result[0].clientEmail).toBe('john@test.com');
  });

  it('hauria de ser case-insensitive', () => {
    const result = filterBudgets(budgets, 'ANNA');
    expect(result.length).toBe(1);
    expect(result[0].clientName).toBe('Anna');
  });

  it('hauria de retornar array buit si no coincideix cap', () => {
    const result = filterBudgets(budgets, 'nobody');
    expect(result.length).toBe(0);
  });

  it('hauria de retornar múltiples resultats si coincideixen', () => {
    const result = filterBudgets(budgets, 'an');
    expect(result.length).toBe(2);
    expect(result.map((b) => b.clientName)).toContain('Anna');
    expect(result.map((b) => b.clientName)).toContain('Jane');
  });
});
