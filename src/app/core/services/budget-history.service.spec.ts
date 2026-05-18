import { TestBed } from '@angular/core/testing';
import { BudgetHistoryService } from './budget-history.service';

describe('BudgetHistoryService', () => {
  let service: BudgetHistoryService;

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({
      providers: [BudgetHistoryService],
    });
    service = TestBed.inject(BudgetHistoryService);
  });

  it('hauria de crear el servei', () => {
    expect(service).toBeTruthy();
  });

  it('hauria de guardar un pressupost', () => {
    const budget = {
      id: 'test-1',
      clientName: 'Test',
      clientEmail: 'test@test.com',
      clientPhone: '123456789',
      selectedServices: [],
      totalPrice: 300,
      date: Date.now(),
    };

    service.saveBudget(budget);
    expect(service.budgets().length).toBe(1);
    expect(service.budgets()[0].clientName).toBe('Test');
  });

  it('hauria de trobar un pressupost per ID', () => {
    const budget = {
      id: 'test-2',
      clientName: 'Test',
      clientEmail: 'test@test.com',
      clientPhone: '123456789',
      selectedServices: [],
      totalPrice: 300,
      date: Date.now(),
    };

    service.saveBudget(budget);
    const found = service.getBudgetById('test-2');
    expect(found).toBeDefined();
    expect(found?.clientName).toBe('Test');
  });

  it('hauria de retornar undefined si no troba el pressupost', () => {
    const found = service.getBudgetById('no-existeix');
    expect(found).toBeUndefined();
  });

  it('hauria de eliminar un pressupost', () => {
    const budget = {
      id: 'test-3',
      clientName: 'Test',
      clientEmail: 'test@test.com',
      clientPhone: '123456789',
      selectedServices: [],
      totalPrice: 300,
      date: Date.now(),
    };

    service.saveBudget(budget);
    expect(service.budgets().length).toBe(1);

    service.deleteBudget('test-3');
    expect(service.budgets().length).toBe(0);
  });
});
