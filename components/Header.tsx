"use client";

import { useThemeStore } from "@/store/themeStore";
import HeaderActions from "./ui/HeaderActions";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

const Header = () => {
  const { isDarkMode, toggleDarkMode } = useThemeStore();
  const path = usePathname();

  return (
    <header>
      <div className="flex justify-between items-center bg-light dark:bg-blue-900 text-gray-900 dark:text-white py-5 max-sm:px-4 max-lg:px-10 lg:px-20">
        <Link href="/">
          <h6 className="max-sm:text-base uppercase tracking-wide sm:text-xl font-semibold select-none">
            WorldLens
          </h6>
        </Link>
        <button
          className="flex items-center max-sm:gap-2 gap-4 cursor-pointer max-sm:text-sm sm:text-base"
          onClick={toggleDarkMode}
        >
          <Image
            src={isDarkMode ? "/sun-white.png" : "/crescent-black.png"}
            alt="Theme Swither"
            width={24}
            height={24}
            className={`w-auto h-auto max-sm:w-6 max-sm:h-6 ${
              isDarkMode ? "" : "transform rotate-90"
            }`}
          />
          {isDarkMode ? "Dark Mode" : "Light Mode"}
        </button>
      </div>
      {!path.includes("/country") && <HeaderActions />}
    </header>
  );
};

export default Header;
