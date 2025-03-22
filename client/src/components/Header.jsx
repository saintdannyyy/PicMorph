import React from "react";

const Header = () => {
  return (
    <header className="fixed w-[70%] top-1 bg-blue-600 shadow-md py-4 flex justify-center items-center rounded-md">
      <h1
        className="text-white font-bold text-2xl"
        style={{ fontFamily: "Lobster, cursive" }}
      >
        PicMorph
      </h1>
    </header>
  );
};

export default Header;
