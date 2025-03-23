import React from "react";

const Header = () => {
  return (
    <header className="fixed w-full top-1 bg-slate-200 shadow-md py-4 flex justify-center items-center rounded-md">
      <h1
        className="text-black font-bold text-5xl"
        style={{ fontFamily: "Lobster, cursive" }}
      >
        PicMorph
      </h1>
    </header>
  );
};

export default Header;
