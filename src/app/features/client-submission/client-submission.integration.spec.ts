import { ComponentFixture, TestBed } from '@angular/core/testing';
import { App } from '../../app';
import { By } from '@angular/platform-browser';
import { SelectionService } from '../../core/services/selection.service';
import { BudgetHistoryService } from '../../core/services/budget-history.service';
import { ServiceConfigEntry } from '../../core/config/services.types';

const MOCK_SERVICES: ServiceConfigEntry[] = [
  {
    id: 'seo',
    name: 'SEO',
    description: 'Optimització per a cercadors',
    basePrice: 300,
    hasSubCosts: false,
  },
  {
    id: 'ads',
    name: 'Google Ads',
    description: 'Campanyes de publicitat a Google',
    basePrice: 400,
    hasSubCosts: false,
  },
  {
    id: 'web',
    name: 'Web',
    description: "Programació d'una web responsive completa",
    basePrice: 500,
    hasSubCosts: true,
    subCosts: [
      { id: 'pages', label: 'Nombre de pàgines', pricePerUnit: 30, min: 1, max: 10, default: 1 },
      { id: 'languages', label: "Nombre d'idiomes", pricePerUnit: 30, min: 1, max: 5, default: 1 },
    ],
  },
];

describe('Client Submission Integration', () => {
  let fixture: ComponentFixture<App>;
  let component: App;
  let selectionService: SelectionService;
  let budgetHistoryService: BudgetHistoryService;

  beforeEach(() => {
    vi.stubGlobal(
      'fetch',
      vi.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve(MOCK_SERVICES),
        }),
      ),
    );
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  beforeEach(async () => {
    localStorage.clear();
    await TestBed.configureTestingModule({
      imports: [App],
    }).compileComponents();

    fixture = TestBed.createComponent(App);
    component = fixture.componentInstance;
    selectionService = TestBed.inject(SelectionService);
    budgetHistoryService = TestBed.inject(BudgetHistoryService);
    fixture.detectChanges();
    await new Promise((resolve) => setTimeout(resolve, 0));
    fixture.detectChanges();
  });

  it('deberia mostrar el formulario al seleccionar un servicio', () => {
    component.onToggleService('seo');
    fixture.detectChanges();

    const form = fixture.debugElement.query(By.css('app-client-form'));
    expect(form).not.toBeNull();
  });

  it('deberia guardar un presupuesto al enviar el formulario con datos validos', () => {
    component.onToggleService('seo');
    fixture.detectChanges();

    const formComponent = fixture.debugElement.query(By.css('app-client-form'));
    const form = formComponent.componentInstance.form;

    form.setValue({
      name: 'Test User',
      email: 'test@example.com',
      phone: '612345678',
    });

    formComponent.componentInstance.onSubmit();
    fixture.detectChanges();

    const budgets = budgetHistoryService.budgets();
    expect(budgets.length).toBe(1);
    expect(budgets[0].clientName).toBe('Test User');
    expect(budgets[0].totalPrice).toBe(300);
  });

  it('deberia mostrar mensaje de exito tras guardar', () => {
    component.onToggleService('seo');
    fixture.detectChanges();

    const formComponent = fixture.debugElement.query(By.css('app-client-form'));
    const form = formComponent.componentInstance.form;

    form.setValue({
      name: 'Test User',
      email: 'test@example.com',
      phone: '612345678',
    });

    formComponent.componentInstance.onSubmit();
    fixture.detectChanges();

    expect(formComponent.componentInstance.successMessage).toContain('ID:');
  });

  it('deberia limpiar la seleccion de servicios tras guardar', () => {
    component.onToggleService('seo');
    fixture.detectChanges();

    const formComponent = fixture.debugElement.query(By.css('app-client-form'));
    const form = formComponent.componentInstance.form;

    form.setValue({
      name: 'Test User',
      email: 'test@example.com',
      phone: '612345678',
    });

    formComponent.componentInstance.onSubmit();
    fixture.detectChanges();

    expect(selectionService.selectedServices().length).toBe(0);
  });

  it('deberia mostrar el historial tras guardar un presupuesto', () => {
    component.onToggleService('seo');
    fixture.detectChanges();

    const formComponent = fixture.debugElement.query(By.css('app-client-form'));
    const form = formComponent.componentInstance.form;

    form.setValue({
      name: 'Test User',
      email: 'test@example.com',
      phone: '612345678',
    });

    formComponent.componentInstance.onSubmit();
    fixture.detectChanges();

    const history = fixture.debugElement.query(By.css('app-budget-history'));
    expect(history).not.toBeNull();
  });
});
