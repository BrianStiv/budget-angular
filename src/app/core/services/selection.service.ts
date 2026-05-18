import { Injectable, signal, computed, inject } from '@angular/core';
import { ServiceId, SelectedService } from '../../models/budget.model';
import { ServicesConfigService } from './services-config.service';

@Injectable({ providedIn: 'root' })
export class SelectionService {
  private readonly servicesConfig = inject(ServicesConfigService);
  readonly selectedServices = signal<SelectedService[]>([]);

  readonly totalPrice = computed(() =>
    this.selectedServices().reduce((sum, s) => sum + s.calculatedPrice, 0),
  );

  isServiceSelected(serviceId: ServiceId): boolean {
    return this.selectedServices().some((s) => s.id === serviceId);
  }

  getServiceWithSubCosts(serviceId: ServiceId): SelectedService | undefined {
    return this.selectedServices().find((s) => s.id === serviceId);
  }

  addService(serviceId: ServiceId): void {
    if (this.isServiceSelected(serviceId)) return;
    const services = this.servicesConfig.services() ?? [];
    const config = services.find((s) => s.id === serviceId);
    if (!config) return;

    const subCostValues: Record<string, number> = {};
    let calculatedPrice = config.basePrice;

    if (config.hasSubCosts && config.subCosts) {
      for (const sub of config.subCosts) {
        subCostValues[sub.id] = sub.default;
      }
      calculatedPrice = this.calculatePrice(config, subCostValues);
    }

    this.selectedServices.update((services) => [
      ...services,
      {
        id: config.id as ServiceId,
        name: config.name,
        basePrice: config.basePrice,
        subCostValues,
        calculatedPrice,
      },
    ]);
  }

  removeService(serviceId: ServiceId): void {
    this.selectedServices.update((services) => services.filter((s) => s.id !== serviceId));
  }

  updateSubCost(serviceId: ServiceId, subCostId: string, value: number): void {
    this.selectedServices.update((services) =>
      services.map((service) => {
        if (service.id !== serviceId) return service;
        const newSubCostValues = { ...service.subCostValues, [subCostId]: value };
        const servicesConfig = this.servicesConfig.services() ?? [];
        const config = servicesConfig.find((s) => s.id === serviceId);
        return {
          ...service,
          subCostValues: newSubCostValues,
          calculatedPrice: config
            ? this.calculatePrice(config, newSubCostValues)
            : service.calculatedPrice,
        };
      }),
    );
  }

  private calculatePrice(
    config: { basePrice: number; subCosts?: { id: string; pricePerUnit: number }[] },
    subCostValues: Record<string, number>,
  ): number {
    let price = config.basePrice;
    if (config.subCosts) {
      for (const sub of config.subCosts) {
        price += (subCostValues[sub.id] ?? 0) * sub.pricePerUnit;
      }
    }
    return price;
  }
}
