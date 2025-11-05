// in Page.tsx

import { getCountries } from "@/lib/utils";
import { CountryData } from "@/types/types";
import Image from "next/image";
import Link from "next/link";

const Page = async ({ params }: { params: { slug: string } }) => {
  const { slug } = await params;

  const countryDetails: CountryData[] = await getCountries("name", slug);
  const country = countryDetails?.[0];

  if (!country) {
    return (
      <main className="text-black text-center py-20 bg-gray-200 dark:bg-blue-950">
        Country not found.
      </main>
    );
  }

  const countryLan = country.languages
    ? Object.keys(country.languages)[0]
    : null;
  const countryCurrency = country.currencies
    ? Object.keys(country.currencies)[0]
    : null;

  const getNativeName = () => {
    if (!countryLan || !country.name.nativeName?.[countryLan]) return "N/A";
    return country.name.nativeName[countryLan]?.official || "N/A";
  };

  const getCurrencyDisplay = () => {
    if (!countryCurrency || !country.currencies?.[countryCurrency])
      return "N/A";
    const currency = country.currencies[countryCurrency];
    return `${currency.symbol || ""} ${currency.name}`;
  };

  return (
    <main className="bg-gray-200 dark:bg-blue-950 text-grey-950 dark:text-white min-h-screen">
      <div className="flex flex-col gap-10 lg:gap-20 py-10 px-6 sm:px-10 lg:px-20">
        <Link
          href="/"
          className="shadow-md bg-white dark:bg-blue-900 text-gray-900 dark:text-white rounded-md w-fit px-6 py-2 transition duration-200 hover:shadow-lg"
        >
          ⟵ Back
        </Link>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-20 items-center">
          {/* Flag Image Container */}
          <div className="relative w-full aspect-video h-auto mb-8 lg:mb-0 shadow-lg">
            <Image
              src={country.flags.svg}
              alt={`${country.name.common} flag`}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>

          {/* Details Section */}
          <div className="flex flex-col h-full justify-between">
            <h1 className="text-2xl sm:text-3xl font-semibold mb-6">
              {country.name.official}
            </h1>

            {/* Country Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-x-10 gap-y-3">
              <p>
                <span className="font-semibold text-gray-900 dark:text-gray-300">
                  Native Name:{" "}
                </span>
                <span className="text-gray-600 dark:text-gray-400">
                  {getNativeName()}
                </span>
              </p>
              <p>
                <span className="font-semibold text-gray-900 dark:text-gray-300">
                  Population:{" "}
                </span>
                <span className="text-gray-600 dark:text-gray-400">
                  {country.population.toLocaleString()}
                </span>
              </p>
              <p>
                <span className="font-semibold text-gray-900 dark:text-gray-300">
                  Region:{" "}
                </span>
                <span className="text-gray-600 dark:text-gray-400">
                  {country.region}
                </span>
              </p>
              <p>
                <span className="font-semibold text-gray-900 dark:text-gray-300">
                  Area:{" "}
                </span>
                <span className="text-gray-600 dark:text-gray-400">
                  {country.area.toLocaleString()} km²
                </span>
              </p>
              <p>
                <span className="font-semibold text-gray-900 dark:text-gray-300">
                  Capital:{" "}
                </span>
                <span className="text-gray-600 dark:text-gray-400">
                  {country.capital?.[0] || "N/A"}
                </span>
              </p>
              <p>
                <span className="font-semibold text-gray-900 dark:text-gray-300">
                  Currencies:{" "}
                </span>
                <span className="text-gray-600 dark:text-gray-400">
                  {getCurrencyDisplay()}
                </span>
              </p>
              <p>
                <span className="font-semibold text-gray-900 dark:text-gray-300">
                  Languages:{" "}
                </span>
                <span className="text-gray-600 dark:text-gray-400">
                  {Object.values(country.languages).join(", ")}
                </span>
              </p>
            </div>

            {/* Border Countries Section */}
            {country.borders && country.borders.length > 0 && (
              <div className="flex flex-wrap items-center mt-8 lg:mt-12 w-full gap-3">
                <span className="font-semibold text-gray-900 dark:text-gray-300 whitespace-nowrap">
                  Border Countries:
                </span>
                <ul className="flex flex-wrap items-center gap-2">
                  {country.borders.map((c, i) => (
                    <li
                      key={i}
                      className="px-4 py-1 rounded-md bg-white dark:bg-blue-900 text-gray-900 dark:text-white text-sm shadow-md transition duration-200"
                    >
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Page;
