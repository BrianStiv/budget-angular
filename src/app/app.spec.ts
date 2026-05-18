import { ComponentFixture, TestBed } from '@angular/core/testing';
import { App } from './app';
import { By } from '@angular/platform-browser';
import { ServicesConfigService } from './core/services/services-config.service';
import { signal } from '@angular/core';
import { ServiceConfigEntry } from './core/config/services.types';

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

describe('App', () => {
  let fixture: ComponentFixture<App>;
  let component: App;

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
    await TestBed.configureTestingModule({
      imports: [App],
    }).compileComponents();

    fixture = TestBed.createComponent(App);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await new Promise((resolve) => setTimeout(resolve, 0));
    fixture.detectChanges();
  });

  it('hauria de crear la app', () => {
    expect(component).toBeTruthy();
  });

  it('hauria de renderitzar el banner', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Aconsegueix la millor qualitat');
  });

  it('hauria de calcular total quan es seleccionen serveis', () => {
    component.onToggleService('seo');
    fixture.detectChanges();
    const totalDisplay = fixture.debugElement.query(By.css('app-total-display'));
    expect(totalDisplay.componentInstance.total()).toBe(300);
  });

  it('hauria de passar isSelected al ServiceCard', () => {
    component.onToggleService('seo');
    fixture.detectChanges();
    const serviceCard = fixture.debugElement.query(By.css('app-service-card'));
    expect(serviceCard.componentInstance.isSelected()).toBe(true);
  });

  it('hauria de actualitzar preu quan canvia config web', () => {
    component.onToggleService('web');
    fixture.detectChanges();
    let totalDisplay = fixture.debugElement.query(By.css('app-total-display'));
    expect(totalDisplay.componentInstance.total()).toBe(560);

    component.onSubCostChange('web', 'pages', 3);
    component.onSubCostChange('web', 'languages', 2);
    fixture.detectChanges();
    totalDisplay = fixture.debugElement.query(By.css('app-total-display'));
    expect(totalDisplay.componentInstance.total()).toBe(650);
  });
});
