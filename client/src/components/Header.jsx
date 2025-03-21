import React from "react";

const Header = () => {
  return (
    <header className="fixed top-1 w-[60%] bg-gradient-to-r from-purple-600 to-indigo-500 shadow-md py-4 flex justify-center items-center rounded-md">
      <h1
        className="text-white text-xl font-bold"
        style={{ fontFamily: "Lobster, cursive" }}
      >
        PicMorph
      </h1>
    </header>
  );
};

export default Header;
