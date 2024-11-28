import React from "react";

const Loading = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <p className="text-emerald-800 text-xl mr-2">Live Weather App</p>
      <div className="w-12 h-12 border-4 border-emerald-800 border-dashed rounded-full animate-spin"></div>
    </div>
  );
};

export default Loading;
