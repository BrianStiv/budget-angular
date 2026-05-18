import { Component, input } from '@angular/core';

@Component({
  selector: 'app-total-display',
  standalone: true,
  imports: [],
  template: `<div class="flex items-baseline justify-end gap-2 py-6 md:justify-center"><span class="text-lg font-semibold text-gray-900">Preu pressupostat:</span><span class="text-4xl font-bold text-gray-900 leading-none">{{ total() }}</span><span class="text-2xl font-semibold text-gray-900">€</span></div>`,
})
export class TotalDisplayComponent {
  total = input(0);
}
