import { Injectable, signal } from '@angular/core';
import { ServiceConfigEntry } from '../config/services.types';

const VALID_SERVICE_IDS = ['seo', 'ads', 'web'] as const;

@Injectable({ providedIn: 'root' })
export class ServicesConfigService {
  readonly services = signal<ServiceConfigEntry[] | null>(null);

  constructor() {
    this.loadConfig();
  }

  private async loadConfig(): Promise<void> {
    try {
      const response = await fetch('/services.json');
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const raw: unknown = await response.json();
      const validated = this.validate(raw);
      this.services.set(validated);
    } catch {
      this.services.set([]);
    }
  }

  private validate(raw: unknown): ServiceConfigEntry[] {
    if (!Array.isArray(raw)) throw new Error('Config no es un array');
    for (const entry of raw) {
      if (typeof entry !== 'object' || entry === null) throw new Error('Entry no es objeto');
      const e = entry as Record<string, unknown>;
      if (typeof e.id !== 'string' || !VALID_SERVICE_IDS.includes(e.id as any))
        throw new Error(`ID inválido: ${e.id}`);
      if (typeof e.name !== 'string') throw new Error('Falta name');
      if (typeof e.description !== 'string') throw new Error('Falta description');
      if (typeof e.basePrice !== 'number') throw new Error('Falta basePrice');
      if (typeof e.hasSubCosts !== 'boolean') throw new Error('Falta hasSubCosts');
    }
    return raw as ServiceConfigEntry[];
  }
}
