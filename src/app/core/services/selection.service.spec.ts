import { TestBed } from '@angular/core/testing';
import { SelectionService } from './selection.service';
import { ServicesConfigService } from './services-config.service';
import { signal } from '@angular/core';
import { ServiceConfigEntry } from '../config/services.types';

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

describe('SelectionService', () => {
  let service: SelectionService;
  let mockConfigService: Partial<ServicesConfigService>;

  beforeEach(() => {
    mockConfigService = {
      services: signal(MOCK_SERVICES),
    };

    TestBed.configureTestingModule({
      providers: [
        SelectionService,
        { provide: ServicesConfigService, useValue: mockConfigService },
      ],
    });
    service = TestBed.inject(SelectionService);
  });

  it('hauria de crear el servei', () => {
    expect(service).toBeTruthy();
  });

  it('hauria de calcular 300 per SEO', () => {
    service.addService('seo');
    expect(service.totalPrice()).toBe(300);
  });

  it('hauria de calcular el preu de web correctament', () => {
    service.addService('web');
    service.updateSubCost('web', 'pages', 3);
    service.updateSubCost('web', 'languages', 2);
    expect(service.totalPrice()).toBe(650);
  });

  it('hauria de sumar preus de múltiples serveis', () => {
    service.addService('seo');
    service.addService('ads');
    expect(service.totalPrice()).toBe(700);
  });

  it('hauria de calcular web amb configuració mínima', () => {
    service.addService('web');
    expect(service.totalPrice()).toBe(560);
  });

  it('hauria de verificar si un servei està seleccionat', () => {
    expect(service.isServiceSelected('seo')).toBe(false);
    service.addService('seo');
    expect(service.isServiceSelected('seo')).toBe(true);
  });
});
