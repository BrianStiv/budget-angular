import { Component, inject, computed, signal } from '@angular/core';
import { BudgetHistoryService } from '../../core/services/budget-history.service';
import { PdfService } from '../../core/services/pdf.service';
import { ShareService } from '../../core/services/share.service';
import { ServicesConfigService } from '../../core/services/services-config.service';
import { Budget, SelectedService } from '../../models/budget.model';
import { SvgIconComponent } from '../../shared/components/svg-icon/svg-icon.component';
import { SortButtonComponent } from '../../shared/components/sort-button/sort-button.component';
import { filterBudgets } from '../../shared/utils/budget-filter.utils';
import { sortBudgets, SortField, SortOrder } from '../../shared/utils/budget-sort.utils';
import { formatSubCosts, getServiceSubCostsConfig } from '../../shared/utils/budget.utils';

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
  private readonly servicesConfigService = inject(ServicesConfigService);

  searchTerm = signal('');
  sortBy = signal<SortField>('date');
  sortOrder = signal<SortOrder>('desc');

  readonly sortOptions: { label: string; field: SortField }[] = [
    { label: 'Data', field: 'date' },
    { label: 'Import', field: 'price' },
    { label: 'Nom', field: 'name' },
  ];

  private searchedBudgets = computed(() =>
    filterBudgets(this.budgetHistoryService.budgets(), this.searchTerm()),
  );

  readonly displayedBudgets = computed(() =>
    sortBudgets(this.searchedBudgets(), this.sortBy(), this.sortOrder()),
  );

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
    if (budget) {
      await this.pdfService.generateBudgetPdf(budget);
    }
  }

  async shareBudget(budget: Budget): Promise<void> {
    await this.shareService.share(budget);
  }

  openBudgetDetail(id: string): void {
    window.open(`/budget/${id}`, '_blank');
  }

  formatServiceSubCosts(service: SelectedService): string {
    const services = this.servicesConfigService.services() ?? [];
    return formatSubCosts(service, getServiceSubCostsConfig(service.id, services));
  }
}
