import { SelectedService } from '../../models/budget.model';
import { SubCostConfig } from '../../core/config/services.types';

export function formatSubCosts(service: SelectedService, subCostsConfig: SubCostConfig[]): string {
  if (!subCostsConfig.length) return '';
  return subCostsConfig
    .filter((sub) => service.subCostValues[sub.id])
    .map((sub) => `${service.subCostValues[sub.id]} ${sub.label.toLowerCase()}`)
    .join(', ');
}

export function getServiceSubCostsConfig(
  serviceId: string,
  services: { id: string; subCosts?: SubCostConfig[] }[],
): SubCostConfig[] {
  const service = services.find((s) => s.id === serviceId);
  return service?.subCosts ?? [];
}
