import React from "react";

const LoadingSmall = () => {
  return (
    <div className="flex w-16 h-16 mt-8">
      <div className="relative">
        <div className="w-12 h-12 rounded-full absolute border-8 border-solid border-gray-200"></div>

        <div className="w-12 h-12 rounded-full animate-spin absolute border-8 border-solid border-black border-t-transparent"></div>
      </div>
    </div>
  );
};

export default LoadingSmall;
