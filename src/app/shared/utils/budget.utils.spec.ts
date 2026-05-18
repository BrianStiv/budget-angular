import { formatSubCosts, getServiceSubCostsConfig } from './budget.utils';
import { SelectedService } from '../../models/budget.model';
import { SubCostConfig, ServiceConfigEntry } from '../../core/config/services.types';

const TEST_SERVICES: ServiceConfigEntry[] = [
  {
    id: 'seo',
    name: 'SEO',
    description: 'Optimització per a cercadors',
    basePrice: 300,
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
      { id: 'languages', label: 'Nombre de llenguatges', pricePerUnit: 30, min: 1, max: 5, default: 1 },
    ],
  },
];

describe('formatSubCosts', () => {
  const subCosts: SubCostConfig[] = [
    { id: 'pages', label: 'Nombre de pàgines', pricePerUnit: 30, min: 1, max: 10, default: 1 },
    { id: 'languages', label: 'Nombre de llenguatges', pricePerUnit: 30, min: 1, max: 5, default: 1 },
  ];

  it('hauria de retornar string buit si no hi ha subcosts', () => {
    const service: SelectedService = {
      id: 'seo',
      name: 'SEO',
      basePrice: 300,
      subCostValues: {},
      calculatedPrice: 300,
    };
    expect(formatSubCosts(service, subCosts)).toBe('');
  });

  it('hauria de formatar un sol subcost', () => {
    const service: SelectedService = {
      id: 'web',
      name: 'Web',
      basePrice: 500,
      subCostValues: { pages: 3 },
      calculatedPrice: 590,
    };
    expect(formatSubCosts(service, subCosts)).toBe('3 nombre de pàgines');
  });

  it('hauria de formatar múltiples subcosts', () => {
    const service: SelectedService = {
      id: 'web',
      name: 'Web',
      basePrice: 500,
      subCostValues: { pages: 5, languages: 2 },
      calculatedPrice: 650,
    };
    expect(formatSubCosts(service, subCosts)).toBe('5 nombre de pàgines, 2 nombre de llenguatges');
  });

  it('hauria de ignorar subcosts amb valor 0', () => {
    const service: SelectedService = {
      id: 'web',
      name: 'Web',
      basePrice: 500,
      subCostValues: { pages: 0, languages: 2 },
      calculatedPrice: 560,
    };
    expect(formatSubCosts(service, subCosts)).toBe('2 nombre de llenguatges');
  });

  it('hauria de funcionar amb subcosts diferents', () => {
    const emailSubCosts: SubCostConfig[] = [
      { id: 'campaigns', label: 'Nombre de campanyes', pricePerUnit: 50, min: 1, max: 10, default: 1 },
    ];
    const service: SelectedService = {
      id: 'web' as any,
      name: 'Email',
      basePrice: 200,
      subCostValues: { campaigns: 3 },
      calculatedPrice: 350,
    };
    expect(formatSubCosts(service, emailSubCosts)).toBe('3 nombre de campanyes');
  });
});

describe('getServiceSubCostsConfig', () => {
  it('hauria de retornar els subcosts del servei web', () => {
    const config = getServiceSubCostsConfig('web', TEST_SERVICES);
    expect(config.length).toBe(2);
    expect(config[0].id).toBe('pages');
  });

  it('hauria de retornar array buit per serveis sense subcosts', () => {
    const config = getServiceSubCostsConfig('seo', TEST_SERVICES);
    expect(config.length).toBe(0);
  });

  it('hauria de retornar array buit per servei inexistent', () => {
    const config = getServiceSubCostsConfig('inexistent', TEST_SERVICES);
    expect(config.length).toBe(0);
  });
});
