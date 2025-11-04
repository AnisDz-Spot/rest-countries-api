const restCountriesURL = "https://restcountries.com/v3.1/";

const fields = [
  "area",
  "borders",
  "capital",
  "region",
  "currencies",
  "flags",
  "languages",
  "name",
  "population",
  "cca3",
];

export const getCountries = async (
  endpoint: string = "all",
  value?: string
) => {
  const req = await fetch(
    `${restCountriesURL}${endpoint}${
      value ? `/${value.toLowerCase()}` : ""
    }?fields=${fields.join()}`
  );
  return req.json();
};
