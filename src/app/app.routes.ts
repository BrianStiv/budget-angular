import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'budget/:id',
    loadComponent: () =>
      import('./features/budget-detail/budget-detail.component').then(
        (m) => m.BudgetDetailComponent,
      ),
  },
];
