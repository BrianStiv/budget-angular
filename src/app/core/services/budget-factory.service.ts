import { Injectable } from '@angular/core';
import { Budget, SelectedService } from '../../models/budget.model';

interface ClientFormData {
  name: string;
  email: string;
  phone: string;
}

@Injectable({ providedIn: 'root' })
export class BudgetFactoryService {
  createBudget(
    clientData: ClientFormData,
    selectedServices: SelectedService[],
    totalPrice: number,
  ): Budget {
    return {
      id: this.generateId(),
      clientName: clientData.name,
      clientEmail: clientData.email,
      clientPhone: clientData.phone,
      selectedServices: selectedServices.map((s) => ({ ...s })),
      totalPrice,
      date: Date.now(),
    };
  }

  private generateId(): string {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }
}
