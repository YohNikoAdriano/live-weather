import React, { memo, useState } from "react";
import { Carousel, IconButton } from "@material-tailwind/react";
import { dateFormat, getWeatherIcon, renameIconPhrase } from '../helper';

const ForecastsCarousel = memo(({ forecasts }) => {
  return (
    <Carousel 
      className="rounded-xl"
      prevArrow={({ handlePrev }) => (
        <IconButton
          variant="text"
          color="white"
          size="lg"
          onClick={handlePrev}
          className="!absolute top-2/4 left-4 -translate-y-2/4"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
          </svg>

        </IconButton>
      )}
      nextArrow={({ handleNext }) => (
        <IconButton
          variant="text"
          color="white"
          size="lg"
          onClick={handleNext}
          className="!absolute top-2/4 !right-4 -translate-y-2/4"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
          </svg>

        </IconButton>
      )}>
      
      {forecasts.map((dailyForecasts, index) => (
        <div className='text-sm text-left w-11/12 mx-auto pb-6 px-6 my-2 bg-gradient-to-r from-neutral-600 to-transparent rounded-xl shadow-lg'>
          <div className="flex align-items-center justify-between py-3">
            <div>
              <p className='text-xs font-normal'>{`Min Temprature: ${Math.round(dailyForecasts?.Temperature?.Minimum?.Value)}°F`}</p>
              <p className='text-xs font-normal'>{`Max Temprature: ${Math.round(dailyForecasts?.Temperature?.Maximum?.Value)}°F`}</p>
            </div>
            <p className='text-[.7rem] font-light'>{dateFormat(dailyForecasts?.Date)}</p>
          </div>

          <div className="text-left grid grid-cols-2 gap-4">
            <div className="day">
              <div className="inline-block px-3 py-2 mb-2 bg-gradient-to-r from-sky-800 via-emerald-700 to-emerald-600 rounded-b-lg focus:outline-emerald-400">
                <p className="text-xs">Day</p>
              </div>
              <div className='text-5xl font-bold my-3'>
                <i className={dailyForecasts?.Day?.Icon ? `wi ${getWeatherIcon(dailyForecasts?.Day?.Icon)}` : "wi-na"} style={{ fontSize: 'inherit', color: 'orange'}}></i>
              </div>
              <p className="text-sm font-extrabold mb-1">{renameIconPhrase(dailyForecasts?.Day?.IconPhrase)}</p>
              <div className="text-[.6rem]/[.6rem] font-light">
                <p>Precipitation Intensity: <span>{dailyForecasts?.Day?.HasPrecipitation ? dailyForecasts?.Day?.PrecipitationIntensity : "-"}</span></p>
                <p>Precipitation Type: <span>{dailyForecasts?.Day?.HasPrecipitation ? dailyForecasts?.Day?.PrecipitationType : "-"}</span></p>
              </div>
            </div>

            <div className="night">
              <div className="inline-block px-3 py-2 mb-2 bg-gradient-to-r from-sky-800 via-emerald-700 to-emerald-600 rounded-b-lg focus:outline-emerald-400">
                <p className="text-xs">Night</p>
              </div>
              <div className='text-5xl font-bold my-3'>
                <i className={dailyForecasts?.Night?.Icon ? `wi ${getWeatherIcon(dailyForecasts?.Night?.Icon)}` : "wi-na"} style={{ fontSize: 'inherit', color: 'orange'}}></i>
              </div>
              <p className="text-sm font-extrabold mb-1">{renameIconPhrase(dailyForecasts?.Night?.IconPhrase)}</p>
              <div className="text-[.6rem]/[.6rem] font-light">
                <p>Precipitation Intensity: <span>{dailyForecasts?.Night?.HasPrecipitation ? dailyForecasts?.Night?.PrecipitationIntensity : "-"}</span></p>
                <p>Precipitation Type: <span>{dailyForecasts?.Night?.HasPrecipitation ? dailyForecasts?.Night?.PrecipitationType : "-"}</span></p>
              </div>
            </div>
          </div>
        </div>
      ))}

    </Carousel>
  )});

export default ForecastsCarousel;
