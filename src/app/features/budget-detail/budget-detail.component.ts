import { Component, inject, signal, computed } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { BudgetHistoryService } from '../../core/services/budget-history.service';
import { Budget, SelectedService } from '../../models/budget.model';
import { ServicesConfigService } from '../../core/services/services-config.service';
import { BannerComponent } from '../budget-builder/banner/banner.component';
import { formatSubCosts, getServiceSubCostsConfig } from '../../shared/utils/budget.utils';

@Component({
  selector: 'app-budget-detail',
  standalone: true,
  imports: [RouterLink, BannerComponent],
  templateUrl: './budget-detail.component.html',
})
export class BudgetDetailComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly historyService = inject(BudgetHistoryService);
  private readonly servicesConfigService = inject(ServicesConfigService);

  budget = signal<Budget | null>(null);
  notFound = signal(false);

  formattedDate = computed(() => {
    const b = this.budget();
    if (!b) return '';
    return new Date(b.date).toLocaleDateString('ca-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  });

  constructor() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      const found = this.historyService.getBudgetById(id);
      if (found) this.budget.set(found);
      else this.notFound.set(true);
    } else {
      this.notFound.set(true);
    }
  }

  formatServiceSubCosts(service: SelectedService): string {
    const services = this.servicesConfigService.services() ?? [];
    return formatSubCosts(service, getServiceSubCostsConfig(service.id, services));
  }
}
