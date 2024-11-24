import React, { memo } from "react";

const CitiesCard = memo(({ index, data, cardClicked }) => {
  const handleClick = () => {
    cardClicked(data?.Key)
  }
  
  return (
    <div className='text-left text-xs px-4 pb-4 bg-gradient-to-r from-neutral-700 to-transparent rounded-lg shadow-lg hover:cursor-pointer' onClick={handleClick}>
      <div className="inline-block px-2.5 py-1.5 mb-1 bg-gradient-to-r from-sky-800 via-emerald-700 to-emerald-600 rounded-b-lg focus:outline-emerald-400">
        <p>{index}</p>
      </div>
      <p className="text-base font-bold">{data?.LocalizedName}</p>
      <p>{data?.AdministrativeArea?.LocalizedName}, {data?.Country?.LocalizedName}</p>
      <p className="text-[.5rem]/[.5rem]">{data?.GeoPosition?.Latitude}, {data?.GeoPosition?.Longitude}</p>
    </div>
  );
});

export default CitiesCard;
