import { Component, input, output } from '@angular/core';
import { SortField, SortOrder } from '../../utils/budget-sort.utils';

@Component({
  selector: 'app-sort-button',
  standalone: true,
  imports: [],
  templateUrl: './sort-button.component.html',
})
export class SortButtonComponent {
  label = input('');
  field = input<SortField>('date');
  activeSort = input<SortField>('date');
  activeOrder = input<SortOrder>('desc');
  sortChange = output<SortField>();

  onClick(): void {
    this.sortChange.emit(this.field());
  }
  get isActive(): boolean {
    return this.activeSort() === this.field();
  }
  get arrow(): string {
    return this.activeOrder() === 'asc' ? '↑' : '↓';
  }
}
