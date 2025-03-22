import React from "react";

const Header = () => {
  return (
    <header className="fixed top-1 sm:w-full md:w-[60%] bg-gradient-to-r from-purple-600 to-indigo-500 shadow-md py-4 flex justify-center items-center rounded-md">
      <h1
        className="text-white font-bold sm:text-md md:text-2xl lg:text-3xl"
        style={{ fontFamily: "Lobster, cursive" }}
      >
        PicMorph
      </h1>
    </header>
  );
};

export default Header;
