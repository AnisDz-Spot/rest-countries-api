type CountryFlags = {
  png: string;
  svg: string;
  alt: string;
};

type CountryName = {
  common: string;
  official: string;
  nativeName: Record<string, { official: string; common: string }>;
};

export interface CountryData {
  flags: CountryFlags;
  name: CountryName;
  currencies: Record<string, { name: string; symbol: string }>;
  capital: string[];
  region: string;
  languages: Record<string, string>;
  borders: string[];
  area: number;
  population: number;
  cca3: string;
}

export type searchByType = "name" | "all" | "lang" | "capital" | "region";

export interface CountryStore {
  searchTerm?: string | undefined;
  searchBy: searchByType;
  region: string;
  countryData?: CountryData[] | undefined;

  setSearchTerm: (term: string | undefined) => void;
  setSearchBy: (search: searchByType) => void;
  setRegion: (region: string) => void;
  setCountryData: (data: CountryData[]) => void;
  fetchCountries: (endpoint?: searchByType) => Promise<void>;
}

export interface ThemeStore {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  initializeTheme: () => void;
}
