import React, { memo, useState } from "react";
import { Carousel, IconButton } from "@material-tailwind/react";
import { dateFormat, getDayOfWeek, getWeatherIcon, renameIconPhrase, fahrenheitToCelsius } from '../helper';

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
          className="!absolute top-2/4 left-4 md:left-16 lg:left-44 -translate-y-2/4"
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
          className="!absolute top-2/4 !right-4 md:!right-16 lg:!right-44 -translate-y-2/4"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
          </svg>

        </IconButton>
      )}>
      
      {forecasts.map((dailyForecasts, index) => (
        <div className='text-sm text-left w-11/12 sm:w-5/6 md:w-4/6 lg:w-7/12 mx-auto pb-6 px-6 sm:px-12 md:px-16 lg:px-20 my-2 bg-gradient-to-r from-neutral-600 to-transparent rounded-xl shadow-lg'>
          <div className="flex items-start justify-between">
            <div className="inline-block px-3 py-2 md:px-5 bg-gradient-to-r from-sky-800 via-emerald-700 to-emerald-600 rounded-b-lg focus:outline-emerald-400 text-center">
              <p className="text-xs md:text-sm">{getDayOfWeek(dailyForecasts?.Date)} Forecast</p>
            </div>

            <div className="text-right mt-3 ml-3">
              <p className='text-xs mb-3 font-light'>{dateFormat(dailyForecasts?.Date)}</p>
              <p className='text-[.7rem]/[.7rem] font-normal'>{`Min Temp: ${Math.round(fahrenheitToCelsius(dailyForecasts?.Temperature?.Minimum?.Value))}°C`}</p>
              <p className='text-[.7rem]/[.7rem] font-normal'>{`Max Temp: ${Math.round(fahrenheitToCelsius(dailyForecasts?.Temperature?.Maximum?.Value))}°C`}</p>
            </div>
          </div>

          <div className="text-left grid grid-cols-2 gap-4 md:gap-6 lg:gap-10 mt-3">
            <div className="day">
              <div className="inline-block px-3 py-2 mb-2 bg-gradient-to-r from-sky-800 via-emerald-700 to-emerald-600 rounded-b-lg focus:outline-emerald-400">
                <p className="text-xs">Day</p>
              </div>
              <div className='text-6xl font-bold my-3'>
                <i className={dailyForecasts?.Day?.Icon ? `wi ${getWeatherIcon(dailyForecasts?.Day?.Icon)}` : "wi-na"} style={{ fontSize: 'inherit', color: 'orange'}}></i>
              </div>
              <p className="text-sm mt-6 font-extrabold mb-1">{renameIconPhrase(dailyForecasts?.Day?.IconPhrase)}</p>
              <div className="text-[.75rem]/[.75rem] font-light">
                <p>Precip Intensity: <span className="font-semibold">{dailyForecasts?.Day?.HasPrecipitation ? dailyForecasts?.Day?.PrecipitationIntensity : "-"}</span></p>
                <p>Precip Type: <span className="font-semibold">{dailyForecasts?.Day?.HasPrecipitation ? dailyForecasts?.Day?.PrecipitationType : "-"}</span></p>
              </div>
            </div>

            <div className="night">
              <div className="inline-block px-3 py-2 mb-2 bg-gradient-to-r from-sky-800 via-emerald-700 to-emerald-600 rounded-b-lg focus:outline-emerald-400">
                <p className="text-xs">Night</p>
              </div>
              <div className='text-6xl font-bold my-3'>
                <i className={dailyForecasts?.Night?.Icon ? `wi ${getWeatherIcon(dailyForecasts?.Night?.Icon)}` : "wi-na"} style={{ fontSize: 'inherit', color: 'orange'}}></i>
              </div>
              <p className="text-sm mt-6 font-extrabold mb-1">{renameIconPhrase(dailyForecasts?.Night?.IconPhrase)}</p>
              <div className="text-[.75rem]/[.75rem] font-light">
                <p>Precip Intensity: <span className="font-semibold">{dailyForecasts?.Night?.HasPrecipitation ? dailyForecasts?.Night?.PrecipitationIntensity : "-"}</span></p>
                <p>Precip Type: <span className="font-semibold">{dailyForecasts?.Night?.HasPrecipitation ? dailyForecasts?.Night?.PrecipitationType : "-"}</span></p>
              </div>
            </div>
          </div>
        </div>
      ))}

    </Carousel>
  )});

export default ForecastsCarousel;
