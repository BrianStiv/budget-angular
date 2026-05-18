import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { BudgetDetailComponent } from './budget-detail.component';
import { BudgetHistoryService } from '../../core/services/budget-history.service';
import { ServicesConfigService } from '../../core/services/services-config.service';
import { signal } from '@angular/core';
import { ServiceConfigEntry } from '../../core/config/services.types';
import { Budget } from '../../models/budget.model';

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

const MOCK_BUDGET: Budget = {
  id: 'test-budget-1',
  clientName: 'Joan Garcia',
  clientEmail: 'joan@example.com',
  clientPhone: '612345678',
  selectedServices: [
    {
      id: 'seo',
      name: 'SEO',
      basePrice: 300,
      subCostValues: {},
      calculatedPrice: 300,
    },
  ],
  totalPrice: 300,
  date: Date.now(),
};

describe('BudgetDetailComponent', () => {
  let component: BudgetDetailComponent;
  let fixture: ComponentFixture<BudgetDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BudgetDetailComponent],
      providers: [
        provideRouter([]),
        {
          provide: BudgetHistoryService,
          useValue: {
            budgets: signal([MOCK_BUDGET]),
            getBudgetById: (id: string) => [MOCK_BUDGET].find((b) => b.id === id),
          },
        },
        {
          provide: ServicesConfigService,
          useValue: {
            services: signal(MOCK_SERVICES),
            isLoading: signal(false),
            error: signal(null),
          },
        },
      ],
    }).compileComponents();
  });

  it('hauria de crear el component', () => {
    fixture = TestBed.createComponent(BudgetDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
});
