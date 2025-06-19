import React from "react";

const Header = () => {
  return (
    <header className="bg-white dark:bg-gray-900">
      <div className="mx-auto flex h-16 max-w-screen-xl items-center gap-8 px-4 sm:px-6 lg:px-8">
        <a className="block text-teal-600 dark:text-teal-300" href="#">
          <span className="sr-only">Home</span>
          <h1 className="text-bold text-2xl">
            Student Progress Management System
          </h1>
        </a>

        <div className="flex flex-1 items-center justify-end md:justify-between">
          <div className="flex items-center gap-4">
            <button className="block rounded-sm bg-gray-100 p-2.5 text-gray-600 transition hover:text-gray-600/75 md:hidden dark:bg-gray-800 dark:text-white dark:hover:text-white/75">
              <span className="sr-only">Toggle menu</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
