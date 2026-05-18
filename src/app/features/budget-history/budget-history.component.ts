import { Component, inject, computed, signal } from '@angular/core';
import { BudgetHistoryService } from '../../core/services/budget-history.service';
import { PdfService } from '../../core/services/pdf.service';
import { ShareService } from '../../core/services/share.service';
import { Budget } from '../../models/budget.model';
import { SvgIconComponent } from '../../shared/components/svg-icon/svg-icon.component';
import { SortButtonComponent } from '../../shared/components/sort-button/sort-button.component';
import { SortField, SortOrder } from '../../shared/utils/budget-sort.utils';

@Component({
  selector: 'app-budget-history',
  standalone: true,
  imports: [SvgIconComponent, SortButtonComponent],
  templateUrl: './budget-history.component.html',
})
export class BudgetHistoryComponent {
  private readonly budgetHistoryService = inject(BudgetHistoryService);
  private readonly pdfService = inject(PdfService);
  private readonly shareService = inject(ShareService);

  searchTerm = signal('');
  sortBy = signal<SortField>('date');
  sortOrder = signal<SortOrder>('desc');

  filteredBudgets = computed(() => {
    let budgets = [...this.budgetHistoryService.budgets()];
    const term = this.searchTerm().toLowerCase();
    if (term) {
      budgets = budgets.filter(
        (b) =>
          b.clientName.toLowerCase().includes(term) ||
          b.clientEmail.toLowerCase().includes(term) ||
          b.clientPhone.includes(term),
      );
    }
    budgets.sort((a, b) => {
      let comparison = 0;
      switch (this.sortBy()) {
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
      return this.sortOrder() === 'asc' ? comparison : -comparison;
    });
    return budgets;
  });

  updateSearch(term: string): void {
    this.searchTerm.set(term);
  }

  toggleSort(field: SortField): void {
    if (this.sortBy() === field) {
      this.sortOrder.set(this.sortOrder() === 'asc' ? 'desc' : 'asc');
    } else {
      this.sortBy.set(field);
      this.sortOrder.set('asc');
    }
  }

  async exportPdf(budgetId: string): Promise<void> {
    const budget = this.budgetHistoryService.getBudgetById(budgetId);
    if (budget) await this.pdfService.generateBudgetPdf(budget);
  }

  async shareBudget(budget: Budget): Promise<void> {
    await this.shareService.share(budget);
  }

  openBudgetDetail(id: string): void {
    window.open(`/budget/${id}`, '_blank');
  }
}
