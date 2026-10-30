import { describe, it, expect, vi } from 'vitest';
import { countryExtractor, countryListLookup } from './language_spoken';

vi.mock('./utils/http-request', () => ({
  default: vi.fn(() =>
    Promise.resolve({
      data: {
        0: { name: 'Argentina' },
        1: { name: 'Bolivia' }
      }
    })
  )
}));

describe('languageSpoken', () => {
  it('converts array of country data objects to array of countries', () => {
    const countriesAllData = [
      { name: 'Argentina', capital: 'Buenos Aires' },
      { name: 'Belize',    capital: 'Belmopan' },
      { name: 'Bolivia',   capital: 'Sucre' }
    ];

    const actualValue = countryExtractor(countriesAllData);

    expect(actualValue).toEqual(['Argentina', 'Belize', 'Bolivia']);
    expect(actualValue[0]).toEqual('Argentina');
    expect(actualValue).toContain('Belize');
    expect(actualValue[2] == 'Bolivia').toBe(true);
    expect(actualValue[3]).toBeUndefined();
  });

  it('returns a list of countries where the language is spoken', async () => {
    const result = await countryListLookup('AR');
    expect(result).toEqual(['Argentina', 'Bolivia']);
  });
});