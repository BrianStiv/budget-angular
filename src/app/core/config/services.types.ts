import { ServiceId } from '../../models/budget.model';

export interface SubCostConfig {
  id: string;
  label: string;
  pricePerUnit: number;
  min: number;
  max: number;
  default: number;
}

export interface ServiceConfigEntry {
  id: ServiceId;
  name: string;
  description: string;
  basePrice: number;
  hasSubCosts: boolean;
  subCosts?: SubCostConfig[];
}
