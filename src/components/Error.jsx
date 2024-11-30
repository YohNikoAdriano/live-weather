import React from "react";

const Error = ({ message }) => {
  return (
    <div className="flex items-center justify-center bg-gradient-to-r mt-10 from-neutral-700 to-transparent p-5 rounded-lg shadow-lg">
      <div className="text-center">
        <h1 className="text-xl font-bold text-red-600">Something Went Wrong :(</h1>
        <p className="text-sm text-white">{message || "An unexpected error occurred. Please try again."}</p>
        <div
          onClick={() => window.location.reload()}
          className="text-sm px-4 py-2 mt-4 text-white bg-red-600 rounded-md shadow hover:bg-red-700 hover:cursor-pointer w-3/5 mx-auto"
        >
          Reload
        </div>
      </div>
    </div>
  );
};

export default Error;
