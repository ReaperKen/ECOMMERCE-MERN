import React from "react";
import { BiErrorAlt } from "react-icons/bi";

const Error = ({ children }) => {
  return (
    <div className="flex m-4 mt-6 container justify-center w-4/5 h-24 mx-auto flex-col space-y-2 items-center text-red-800 rounded-xl">
      <BiErrorAlt className="text-center text-5xl text-red-800" />
      <h1 className="text-center text-2xl">{children}</h1>
    </div>
  );
};

export default Error;
