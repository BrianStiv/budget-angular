import { Component, inject, signal } from '@angular/core';
import { Router, RouterOutlet, NavigationEnd } from '@angular/router';
import { SelectionService } from './core/services/selection.service';
import { BudgetHistoryService } from './core/services/budget-history.service';
import { ServicesConfigService } from './core/services/services-config.service';
import { ServiceId } from './models/budget.model';
import { BannerComponent } from './features/budget-builder/banner/banner.component';
import { ServiceCardComponent } from './features/budget-builder/service-card/service-card.component';
import { TotalDisplayComponent } from './shared/components/total-display/total-display.component';
import { ClientFormComponent } from './features/client-submission/client-form/client-form.component';
import { BudgetHistoryComponent } from './features/budget-history/budget-history.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    BannerComponent,
    ServiceCardComponent,
    TotalDisplayComponent,
    ClientFormComponent,
    BudgetHistoryComponent,
  ],
  templateUrl: './app.html',
})
export class App {
  protected readonly selectionService = inject(SelectionService);
  protected readonly budgetHistoryService = inject(BudgetHistoryService);
  protected readonly servicesConfigService = inject(ServicesConfigService);
  private readonly router = inject(Router);
  readonly services = this.servicesConfigService.services;

  isHome = signal(true);

  constructor() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) this.isHome.set(event.url === '/' || event.url === '');
    });
  }

  onToggleService(serviceId: ServiceId): void {
    if (this.selectionService.isServiceSelected(serviceId))
      this.selectionService.removeService(serviceId);
    else this.selectionService.addService(serviceId);
  }

  onSubCostChange(serviceId: ServiceId, subCostId: string, value: number): void {
    this.selectionService.updateSubCost(serviceId, subCostId, value);
  }

  getServiceSubCostValues(serviceId: ServiceId): Record<string, number> {
    return this.selectionService.getServiceWithSubCosts(serviceId)?.subCostValues ?? {};
  }
}
