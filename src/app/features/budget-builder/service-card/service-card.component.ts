import { Component, input, output } from '@angular/core';
import { SubCost, ServiceId } from '../../../models/budget.model';
import { NumberStepperComponent } from '../../../shared/components/number-stepper/number-stepper.component';

@Component({
  selector: 'app-service-card',
  standalone: true,
  imports: [NumberStepperComponent],
  templateUrl: './service-card.component.html',
})
export class ServiceCardComponent {
  id = input.required<ServiceId>();
  name = input.required<string>();
  description = input.required<string>();
  basePrice = input.required<number>();
  isSelected = input(false);
  hasSubCosts = input(false);
  subCosts = input<SubCost[]>([]);
  subCostValues = input<Record<string, number | undefined>>({});

  toggle = output<ServiceId>();
  subCostChange = output<{ subCostId: string; value: number }>();

  onToggle(): void {
    this.toggle.emit(this.id());
  }

  onSubCostChange(subCostId: string, value: number): void {
    this.subCostChange.emit({ subCostId, value });
  }
}
