// in CountryCard.tsx

"use client";

import { useCountryStore } from "@/store/countryStore";
import { useEffect, useState, useMemo } from "react";
import Pagination from "rc-pagination";
import "rc-pagination/assets/index.css";
import Image from "next/image";
import Link from "next/link";

const PAGE_SIZE = 8;

const CountryCard = () => {
  const { countryData, fetchCountries } = useCountryStore();
  const [currentPage, setCurrentPage] = useState(1);

  const onPageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    fetchCountries();
  }, [fetchCountries]);

  useEffect(() => {
    setCurrentPage(1);
  }, [countryData]);

  const currentData = useMemo(() => {
    if (!countryData) return [];
    const startIndex = (currentPage - 1) * PAGE_SIZE;
    const endIndex = startIndex + PAGE_SIZE;
    return countryData.slice(startIndex, endIndex);
  }, [countryData, currentPage]);

  return (
    <>
      {currentData?.length ? (
        currentData.map((c, i) => (
          <Link
            href={`/country/${c.name.official.toLowerCase()}`}
            key={c.name?.official || i}
          >
            <div className="bg-white dark:bg-blue-900 text-gray-900 dark:text-white col-span-1">
              <div className="relative w-full max-sm:h-[50vw] h-36">
                <Image
                  src={c.flags?.png}
                  alt={`${c.name?.official} flag`}
                  fill
                  loading={i === 0 ? "eager" : "lazy"}
                  priority={i === 0}
                  sizes="
                  (max-width: 768px) 100vw,
                  (max-width: 1024px) 50vw,
                  25vw
                "
                />
              </div>
              <div className="px-6 py-4">
                <h3 className="font-semibold mb-2">{c.name.official}</h3>
                <ul className="flex flex-col gap-1">
                  <li className="text-xs">
                    <span className="font-semibold dark:text-white">
                      Population:
                    </span>
                    <span className="text-gray-600 dark:text-gray-300">
                      {" "}
                      {c.population}
                    </span>
                  </li>
                  <li className="text-xs">
                    <span className="font-semibold dark:text-white">
                      Region:
                    </span>
                    <span className="text-gray-600 dark:text-gray-300">
                      {" "}
                      {c.region}
                    </span>
                  </li>
                  <li className="text-xs">
                    <span className="font-semibold dark:text-white">
                      Capital:{" "}
                    </span>
                    <span className="text-gray-600 dark:text-gray-300">
                      {c.capital?.[0]}
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </Link>
        ))
      ) : (
        <div className="col-span-full text-center py-10">
          No countries found.
        </div>
      )}
      {countryData && countryData?.length > PAGE_SIZE ? (
        <div className="col-span-full flex justify-center mt-8">
          <Pagination
            className="rc-pagination-dark"
            onChange={onPageChange}
            current={currentPage}
            total={countryData?.length}
            pageSize={PAGE_SIZE}
            locale={{
              prev_page: "Previous Page",
              next_page: "Next Page",
              page: "Page",
              jump_to: "Jump to",
            }}
          />
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default CountryCard;
