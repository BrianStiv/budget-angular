export type ServiceId = 'seo' | 'ads' | 'web';

export interface SubCost {
  id: string;
  label: string;
  pricePerUnit: number;
  min: number;
  max: number;
  default: number;
}

export interface SelectedService {
  id: ServiceId;
  name: string;
  basePrice: number;
  subCostValues: Record<string, number>;
  calculatedPrice: number;
}

export interface Budget {
  id: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  selectedServices: SelectedService[];
  totalPrice: number;
  date: number;
}
