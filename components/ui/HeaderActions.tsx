"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useCountryStore } from "@/store/countryStore";
import { useDebounce } from "use-debounce";
import { searchByType } from "@/types/types";

const HeaderActions = () => {
  const [reg, setReg] = useState<string>(); // region state
  const [searchCountry, setSearchCountry] = useState(""); // search input state
  const { setSearchTerm, setRegion, setSearchBy, fetchCountries } =
    useCountryStore(); // extract store values
  const [term] = useDebounce(searchCountry, 500); // debounced country search

  // Handle User input (Country)
  const handleCountryChange = (country: string) => {
    setSearchCountry(country);
  };

  // Handle User selection (Region)
  const handleRegionChange = (reg: string) => {
    setRegion(reg);
    setReg(reg);
    fetchCountries();
  };

  // Handle Search Param
  const handleSearchChange = (param: searchByType) => {
    setSearchBy(param);
    fetchCountries();
  };

  useEffect(() => {
    setSearchTerm(term || undefined);

    if (term !== undefined && term !== "") {
      fetchCountries();
    } else if (term === "") {
      fetchCountries();
    }
  }, [term, setSearchTerm, fetchCountries]);

  return (
    <div className="flex max-sm:flex-col bg-gray-200 dark:bg-blue-950 sm:justify-between max-sm:items-start max-md:justify-between items-center max-md:gap-4 md:gap-5 max-sm:px-5 max-md:px-10 md:px-10 lg:px-20 px-20 py-10">
      <div className="flex max-sm:flex-col w-full gap-4">
        <div className="flex items-center gap-5 px-4 bg-white dark:bg-blue-900 rounded-md h-10">
          <Image
            src="/search-white.png"
            alt="Search Icon"
            width={24}
            height={24}
            className="w-6 h-auto cursor-pointer"
          />
          <input
            type="search"
            name="search"
            id="search"
            placeholder="Search for a country..."
            className="text-sm text-gray-900 dark:text-white outline-0 dark:border-0 border-0 placeholder:text-gray-400 dark:placeholder:text-gray-500 bg-white dark:bg-blue-900 w-[300px] max-md:w-[220px] max-sm:w-full h-full"
            onChange={(e) => handleCountryChange(e.target.value)}
            value={searchCountry}
          />
        </div>
        <select
          name="search-by"
          id="search-by"
          className="dark:bg-blue-900 bg-white text-gray-900 dark:text-white max-sm:w-full h-10 w-40 max-md:w-32 p-2 rounded-md max-md:px-1 text-sm text-left"
          onChange={(e) => handleSearchChange(e.target.value as searchByType)}
        >
          <option value="name">Search by Name</option>
          <option value="lang">Search by Lang</option>
          <option value="capital">Search by Capital</option>
        </select>
      </div>
      <select
        name="filter-by-region"
        id="filter-by-region"
        className="bg-white dark:bg-blue-900 text-gray-900 dark:text-white h-10 w-40 max-md:w-32 max-sm:w-full max-sm:mt-4 p-2 max-md:px-1 rounded-md text-sm text-left"
        onChange={(e) => handleRegionChange(e.target.value)}
        value={reg}
      >
        <option value="all">Filter by region</option>
        <option value="Africa">Africa</option>
        <option value="Americas">Americas</option>
        <option value="Asia">Asia</option>
        <option value="Europe">Europe</option>
        <option value="Oceania">Oceania</option>
      </select>
    </div>
  );
};

export default HeaderActions;
