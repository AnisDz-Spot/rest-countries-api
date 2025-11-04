import { getCountries } from "@/lib/utils";
import { CountryData } from "@/types/types";
import Image from "next/image";
import Link from "next/link";

const Page = async ({ params }: { params: { slug: string } }) => {
  const { slug } = await params;

  const countryDetails: CountryData[] = await getCountries("name", slug);
  const country = countryDetails?.[0];

  if (!country) {
    return <main className="text-black">Country not found.</main>;
  }

  const countryLan = Object.keys(country.languages)[0];
  const countryCurrency = Object.keys(country.currencies)[0];

  return (
    <main className="bg-gray-200 dark:bg-blue-950 text-grey-950 dark:text-white w-screen h-[calc(100vh-68px)]">
      <div className="flex flex-col gap-20 py-10 max-sm:px-5 max-lg:px-10 px-20">
        <Link
          href="/"
          className="shadow-2xl bg-gray-600 text-white dark:bg-blue-900 rounded-md w-fit px-6 py-2 hover:bg-blue-800 duration-200"
        >
          ⟵ Back
        </Link>
        <div className="relative grid lg:grid-cols-2 grid-cols-1 sm:gap-10">
          <div className="relative w-full sm:col-span-full lg:col-span-1 md:w-[80%] lg:w-full md:mx-auto h-[300px] max-sm:mb-10">
            <Image
              src={country.flags.svg}
              alt={`${country.name.common} flag`}
              fill
              priority
              sizes="
              (max-width: 768px) 100vw,
              (max-width: 1024px) 50vw,
              25vw
              "
            />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-semibold mb-6">
              {country?.name.official}
            </h1>
            <div className="grid grid-cols-2 w-full gap-x-20 gap-y-5">
              <p className="text-gray-600 dark:text-gray-400">
                <span className="text-gray-900 dark:text-gray-300">
                  Region:{" "}
                </span>
                {country.region}
              </p>
              <p className="text-gray-600 dark:text-gray-400">
                <span className="text-gray-900 dark:text-gray-300">
                  Population:{" "}
                </span>
                {country.population}
              </p>
              <p className="text-gray-600 dark:text-gray-400">
                <span className="text-gray-900 dark:text-gray-300">
                  Capital:{" "}
                </span>
                {country.capital[0]}
              </p>
              <p className="text-gray-600 dark:text-gray-400">
                <span className="text-gray-900 dark:text-gray-300">Area: </span>
                {country.area}
              </p>
              <p className="text-gray-600 dark:text-gray-400">
                <span className="text-gray-900 dark:text-gray-300">
                  Native Name:{" "}
                </span>
                {country.name.nativeName[countryLan].official}
              </p>
              <p className="text-gray-600 dark:text-gray-400">
                <span className="text-gray-900 dark:text-gray-300">
                  Currencies:{" "}
                </span>
                {`${country.currencies[countryCurrency]?.symbol} ${country.currencies[countryCurrency]?.name}`}
              </p>
              {country.borders.length > 0 && (
                <ul className="flex items-center col-span-full gap-3 max-lg:relative max-lg:mt-8 absolute bottom-0">
                  <span className="text-gray-900 dark:text-gray-300">
                    Borders:{" "}
                  </span>
                  {country.borders.map((c, i) => (
                    <li
                      key={i}
                      className="px-8 py-1 rounded-md bg-blue-900 text-sm text-white hover:bg-blue-800 duration-200"
                    >
                      {c}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Page;
