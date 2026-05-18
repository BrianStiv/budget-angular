import { TestBed } from '@angular/core/testing';
import { BudgetFactoryService } from './budget-factory.service';

describe('BudgetFactoryService', () => {
  let service: BudgetFactoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BudgetFactoryService],
    });
    service = TestBed.inject(BudgetFactoryService);
  });

  it('hauria de crear el servei', () => {
    expect(service).toBeTruthy();
  });

  describe('generateId', () => {
    it('hauria de generar un ID amb format timestamp-random', () => {
      const id = service.generateId();
      const parts = id.split('-');
      expect(parts.length).toBeGreaterThanOrEqual(2);
      expect(Number(parts[0])).toBeGreaterThan(0);
    });

    it('hauria de generar IDs únics', () => {
      const id1 = service.generateId();
      const id2 = service.generateId();
      expect(id1).not.toBe(id2);
    });
  });

  describe('createBudget', () => {
    it('hauria de crear un budget amb les dades del client', () => {
      const budget = service.createBudget(
        { name: 'Test', email: 'test@test.com', phone: '123456789' },
        [],
        0,
      );

      expect(budget.clientName).toBe('Test');
      expect(budget.clientEmail).toBe('test@test.com');
      expect(budget.clientPhone).toBe('123456789');
    });

    it('hauria de crear un budget amb un ID generat', () => {
      const budget = service.createBudget(
        { name: 'Test', email: 'test@test.com', phone: '123456789' },
        [],
        300,
      );

      expect(budget.id).toBeDefined();
      expect(budget.id.length).toBeGreaterThan(0);
    });

    it('hauria de copiar els serveis seleccionats (no referència)', () => {
      const services = [
        { id: 'seo' as const, name: 'SEO', basePrice: 300, subCostValues: {}, calculatedPrice: 300 },
      ];

      const budget = service.createBudget(
        { name: 'Test', email: 'test@test.com', phone: '123456789' },
        services,
        300,
      );

      expect(budget.selectedServices).not.toBe(services);
      expect(budget.selectedServices).toEqual(services);
    });

    it('hauria de calcular el preu total correctament', () => {
      const services = [
        { id: 'seo' as const, name: 'SEO', basePrice: 300, subCostValues: {}, calculatedPrice: 300 },
        { id: 'ads' as const, name: 'Ads', basePrice: 400, subCostValues: {}, calculatedPrice: 400 },
      ];

      const budget = service.createBudget(
        { name: 'Test', email: 'test@test.com', phone: '123456789' },
        services,
        700,
      );

      expect(budget.totalPrice).toBe(700);
    });

    it('hauria de establir la data actual', () => {
      const before = Date.now();
      const budget = service.createBudget(
        { name: 'Test', email: 'test@test.com', phone: '123456789' },
        [],
        0,
      );
      const after = Date.now();

      expect(budget.date).toBeGreaterThanOrEqual(before);
      expect(budget.date).toBeLessThanOrEqual(after);
    });
  });
});
