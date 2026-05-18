import { ServicesConfigService } from './services-config.service';

const VALID_JSON = [
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

describe('ServicesConfigService', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('hauria de crear el servei', () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve(VALID_JSON),
        }),
      ),
    );
    const service = new ServicesConfigService();
    expect(service).toBeTruthy();
  });

  it('hauria de tenir services=null inicialment', () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve(VALID_JSON),
        }),
      ),
    );
    const service = new ServicesConfigService();
    expect(service.services()).toBeNull();
  });

  describe('quan el JSON és vàlid', () => {
    beforeEach(() => {
      vi.stubGlobal(
        'fetch',
        vi.fn(() =>
          Promise.resolve({
            ok: true,
            json: () => Promise.resolve(VALID_JSON),
          }),
        ),
      );
    });

    it('hauria de carregar i validar els serveis', async () => {
      const service = new ServicesConfigService();
      await new Promise((resolve) => setTimeout(resolve, 0));
      expect(service.services()).not.toBeNull();
      expect(service.services()?.length).toBe(3);
    });
  });

  describe('quan el fetch falla', () => {
    beforeEach(() => {
      vi.stubGlobal(
        'fetch',
        vi.fn(() =>
          Promise.resolve({
            ok: false,
            status: 404,
          }),
        ),
      );
    });

    it('hauria de tenir services buit quan el fetch retorna 404', async () => {
      const service = new ServicesConfigService();
      await new Promise((resolve) => setTimeout(resolve, 0));
      expect(service.services()).toEqual([]);
    });
  });

  describe('quan el JSON és invàlid', () => {
    beforeEach(() => {
      vi.stubGlobal(
        'fetch',
        vi.fn(() =>
          Promise.resolve({
            ok: true,
            json: () => Promise.resolve('no es un array'),
          }),
        ),
      );
    });

    it('hauria de tenir services buit quan el JSON no és un array', async () => {
      const service = new ServicesConfigService();
      await new Promise((resolve) => setTimeout(resolve, 0));
      expect(service.services()).toEqual([]);
    });
  });

  describe('quan falta un camp obligatori', () => {
    beforeEach(() => {
      vi.stubGlobal(
        'fetch',
        vi.fn(() =>
          Promise.resolve({
            ok: true,
            json: () => Promise.resolve([{ id: 'seo', name: 'SEO' }]),
          }),
        ),
      );
    });

    it('hauria de tenir services buit quan falta description', async () => {
      const service = new ServicesConfigService();
      await new Promise((resolve) => setTimeout(resolve, 0));
      expect(service.services()).toEqual([]);
    });
  });

  describe("quan l'ID no és vàlid", () => {
    beforeEach(() => {
      vi.stubGlobal(
        'fetch',
        vi.fn(() =>
          Promise.resolve({
            ok: true,
            json: () =>
              Promise.resolve([
                {
                  id: 'invalid',
                  name: 'Invalid',
                  description: 'Test',
                  basePrice: 100,
                  hasSubCosts: false,
                },
              ]),
          }),
        ),
      );
    });

    it("hauria de tenir services buit quan l'ID no és seo/ads/web", async () => {
      const service = new ServicesConfigService();
      await new Promise((resolve) => setTimeout(resolve, 0));
      expect(service.services()).toEqual([]);
    });
  });
});
