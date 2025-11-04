import { getCountries } from "@/lib/utils";
import { CountryData, CountryStore, searchByType } from "@/types/types";
import { create } from "zustand";

export const useCountryStore = create<CountryStore>((set, get) => ({
  region: "all",
  searchBy: "name",
  searchTerm: undefined,
  countryData: undefined,

  setSearchTerm: (term: string | undefined) => set({ searchTerm: term }),
  setSearchBy: (search: searchByType) => set({ searchBy: search }),
  setRegion: (region: string) => set({ region }),
  setCountryData: (data: CountryData[]) => set({ countryData: data }),

  fetchCountries: async () => {
    let endpoint: string = "all";
    let value: string | undefined = undefined;

    // Fetch a *specific* country/group if a search term is present
    if (get().searchTerm) {
      endpoint = get().searchBy;
      value = get().searchTerm;
    }

    // Check if the search term is empty or undefined and searchBy is not "all"
    // to prevent fetching with an empty string which is not allowed by the API
    if (get().searchTerm === "") {
      get().setCountryData([]);
      return;
    }

    try {
      // Fetch data based on search term or all
      const rawCountries = await getCountries(endpoint, value);

      // Ensure rawCountries is an array (API returns an object for 404)
      const countries = Array.isArray(rawCountries) ? rawCountries : [];

      // Client-side filter by region if not "all"
      if (get().region !== "all") {
        const filterdByRegion = countries.filter(
          (c: any) => c.region === get().region
        );
        get().setCountryData(filterdByRegion);
      } else {
        get().setCountryData(countries);
      }
    } catch (error) {
      console.error("Failed to fetch countries:", error);
      get().setCountryData([]);
    }
  },
}));
