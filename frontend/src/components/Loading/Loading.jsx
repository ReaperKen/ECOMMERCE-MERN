import React from "react";

const Loading = () => {
  return (
    <div className="container my-8 mx-auto w-56 h-56 p-10 transition-all duration-700 bg-white drop-shadow-2xl rounded-3xl ring-4 ring-gray-900 ring-offset-2">
      <div className="flex flex-col items-center text-gray-500">
        <span className="block w-24 h-24 boder-4 rounded-full shadow border-t-black animate-spin"></span>
        <h1 className="mt-8 text-2xl tracking-widest uppercase">Loading...</h1>
      </div>
    </div>
  );
};

export default Loading;
