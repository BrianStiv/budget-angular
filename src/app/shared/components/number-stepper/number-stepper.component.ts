import { Component, input, output } from '@angular/core';
import { SvgIconComponent } from '../svg-icon/svg-icon.component';

@Component({
  selector: 'app-number-stepper',
  standalone: true,
  imports: [SvgIconComponent],
  templateUrl: './number-stepper.component.html',
})
export class NumberStepperComponent {
  label = input('');
  value = input(0);
  min = input(0);
  max = input(100);
  valueChange = output<number>();

  decrement(): void {
    if (this.value() > this.min()) this.valueChange.emit(this.value() - 1);
  }
  increment(): void {
    if (this.value() < this.max()) this.valueChange.emit(this.value() + 1);
  }
  updateValue(newValue: string): void {
    const num = parseInt(newValue, 10);
    if (!isNaN(num)) this.valueChange.emit(Math.max(this.min(), Math.min(this.max(), num)));
  }
}
