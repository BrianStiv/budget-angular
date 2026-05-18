import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BudgetHistoryComponent } from './budget-history.component';
import { ServicesConfigService } from '../../core/services/services-config.service';
import { signal } from '@angular/core';
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

describe('BudgetHistoryComponent', () => {
  let component: BudgetHistoryComponent;
  let fixture: ComponentFixture<BudgetHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BudgetHistoryComponent],
      providers: [
        {
          provide: ServicesConfigService,
          useValue: {
            services: signal(MOCK_SERVICES),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(BudgetHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('hauria de crear el component', () => {
    expect(component).toBeTruthy();
  });

  it('hauria de ordenar pressupostos per preu', () => {
    component.sortBy.set('price');
    component.sortOrder.set('desc');
    const budgets = component.displayedBudgets();
    for (let i = 0; i < budgets.length - 1; i++) {
      expect(budgets[i].totalPrice).toBeGreaterThanOrEqual(budgets[i + 1].totalPrice);
    }
  });
});
