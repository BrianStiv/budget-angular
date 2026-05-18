import { sortBudgets, SortField, SortOrder } from './budget-sort.utils';
import { Budget } from '../../models/budget.model';

function makeBudget(name: string, price: number, date: number): Budget {
  return {
    id: `test-${name}`,
    clientName: name,
    clientEmail: `${name}@test.com`,
    clientPhone: '123456789',
    selectedServices: [],
    totalPrice: price,
    date,
  };
}

describe('sortBudgets', () => {
  const budgets: Budget[] = [
    makeBudget('Zoe', 300, 1000),
    makeBudget('Anna', 700, 3000),
    makeBudget('John', 500, 2000),
  ];

  it('hauria de ordenar per nom ascendent', () => {
    const result = sortBudgets(budgets, 'name', 'asc');
    expect(result.map((b) => b.clientName)).toEqual(['Anna', 'John', 'Zoe']);
  });

  it('hauria de ordenar per nom descendent', () => {
    const result = sortBudgets(budgets, 'name', 'desc');
    expect(result.map((b) => b.clientName)).toEqual(['Zoe', 'John', 'Anna']);
  });

  it('hauria de ordenar per preu ascendent', () => {
    const result = sortBudgets(budgets, 'price', 'asc');
    expect(result.map((b) => b.totalPrice)).toEqual([300, 500, 700]);
  });

  it('hauria de ordenar per preu descendent', () => {
    const result = sortBudgets(budgets, 'price', 'desc');
    expect(result.map((b) => b.totalPrice)).toEqual([700, 500, 300]);
  });

  it('hauria de ordenar per data ascendent', () => {
    const result = sortBudgets(budgets, 'date', 'asc');
    expect(result.map((b) => b.date)).toEqual([1000, 2000, 3000]);
  });

  it('hauria de ordenar per data descendent', () => {
    const result = sortBudgets(budgets, 'date', 'desc');
    expect(result.map((b) => b.date)).toEqual([3000, 2000, 1000]);
  });

  it('no hauria de mutar larray original', () => {
    const original = [...budgets];
    sortBudgets(budgets, 'name', 'asc');
    expect(budgets).toEqual(original);
  });

  it('hauria de retornar array buit si no hi ha pressupostos', () => {
    expect(sortBudgets([], 'name', 'asc')).toEqual([]);
  });
});
