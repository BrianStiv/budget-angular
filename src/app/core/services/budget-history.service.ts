import { Injectable, signal, effect } from '@angular/core';
import { Budget } from '../../models/budget.model';

@Injectable({ providedIn: 'root' })
export class BudgetHistoryService {
  private readonly STORAGE_KEY = 'budgets';
  readonly budgets = signal<Budget[]>([]);

  constructor() {
    this.loadBudgets();
    effect(() => {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.budgets()));
    });
  }

  private loadBudgets(): void {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          this.budgets.set(parsed);
        }
      } catch {
        this.budgets.set([]);
      }
    }
  }

  saveBudget(budget: Budget): void {
    this.budgets.update((budgets) => [budget, ...budgets]);
  }

  getBudgetById(id: string): Budget | undefined {
    return this.budgets().find((b) => b.id === id);
  }

  deleteBudget(id: string): void {
    this.budgets.update((budgets) => budgets.filter((b) => b.id !== id));
  }
}
