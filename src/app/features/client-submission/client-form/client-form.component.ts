import { Component, inject, computed } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SelectionService } from '../../../core/services/selection.service';
import { BudgetHistoryService } from '../../../core/services/budget-history.service';
import { BudgetFactoryService } from '../../../core/services/budget-factory.service';
import { SvgIconComponent } from '../../../shared/components/svg-icon/svg-icon.component';

@Component({
  selector: 'app-client-form',
  standalone: true,
  imports: [ReactiveFormsModule, SvgIconComponent],
  templateUrl: './client-form.component.html',
})
export class ClientFormComponent {
  private readonly fb = inject(FormBuilder);
  private readonly selectionService = inject(SelectionService);
  private readonly budgetHistoryService = inject(BudgetHistoryService);
  private readonly budgetFactoryService = inject(BudgetFactoryService);

  form: FormGroup;
  isSubmitted = false;
  successMessage = '';

  constructor() {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]{9,15}$/)]],
    });
  }

  get name() {
    return this.form.get('name');
  }
  get email() {
    return this.form.get('email');
  }
  get phone() {
    return this.form.get('phone');
  }

  private getFieldClasses(field: string): string {
    return this.isFieldInvalid(field)
      ? 'border-red-500 bg-red-50 focus:border-red-500 focus:shadow-[0_0_0_3px_rgba(220,53,69,0.1)]'
      : 'border-gray-200 focus:border-[#28a745] focus:shadow-[0_0_0_3px_rgba(40,167,69,0.1)]';
  }

  nameClasses = computed(() => this.getFieldClasses('name'));
  phoneClasses = computed(() => this.getFieldClasses('phone'));
  emailClasses = computed(() => this.getFieldClasses('email'));

  onSubmit(): void {
    this.isSubmitted = true;
    if (this.form.valid && this.selectionService.totalPrice() > 0) {
      const budget = this.budgetFactoryService.createBudget(
        { name: this.name?.value, email: this.email?.value, phone: this.phone?.value },
        this.selectionService.selectedServices(),
        this.selectionService.totalPrice(),
      );
      this.budgetHistoryService.saveBudget(budget);
      this.selectionService.selectedServices.set([]);
      this.successMessage = `Pressupost guardat! ID: ${budget.id}`;
      this.form.reset();
      this.isSubmitted = false;
      setTimeout(() => {
        this.successMessage = '';
      }, 5000);
    }
  }

  isFieldInvalid(field: string): boolean {
    const control = this.form.get(field);
    return !!control && control.invalid && (control.dirty || control.touched || this.isSubmitted);
  }
}
