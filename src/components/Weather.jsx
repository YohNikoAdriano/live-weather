import React, { memo, useState } from "react";
import { dateFormat, getWeatherIcon, fahrenheitToCelsius } from '../helper';

const Weather = memo(({ weatherData, headline, forecastsData, loc }) => {
  return (
    <>
      <div className='text-sm text-left w-11/12 sm:w-5/6 md:w-4/6 lg:w-7/12 mx-auto pb-6 px-6 sm:px-12 md:px-16 lg:px-20 mt-10 mb-2 bg-gradient-to-r from-neutral-600 to-transparent rounded-xl shadow-lg'>

        <div className="flex items-start justify-between">
          <div className="inline-block px-3 md:px-5 py-2 bg-gradient-to-r from-sky-800 via-emerald-700 to-emerald-600 rounded-b-lg focus:outline-emerald-400 text-center">
            <p className="text-xs md:text-sm">Today Forecast</p>
          </div>

          <div className="text-right mt-3 ml-3">
            <p className='text-xs font-light'>{dateFormat(headline?.EffectiveDate)}</p>
            <p className='text-xl/[1rem] my-3 font-medium mb-1'>{loc || "No Location :("}</p>
          </div>
        </div>

        <div className='flex items-center'>
          <div className="w-20 h-20 text-6xl flex-none">
            <div className="flex items-center justify-center h-full w-full">
              <div>
              <i className={weatherData?.WeatherIcon ? `wi ${getWeatherIcon(weatherData?.WeatherIcon)}` : "wi-na"} style={{ fontSize: 'inherit', lineHeight: '3rem', color: 'orange'}}></i>
              </div>
            </div>
          </div>
          <div className="flex justify-end w-full">
            <div className="flex text-right">
              <div className='mr-2 text-xs font-medium'>
                <p>{Math.round(weatherData?.Temperature?.Metric?.Value)}°C</p>
                <p>{Math.round(weatherData?.Temperature?.Imperial?.Value)}°F</p>
              </div>
              <span className='text-xl font-extrabold border-l-2 pl-2'>{weatherData.WeatherText || "No Weather :("}</span>
            </div>
          </div>
        </div>

        <div className='flex items-center'>
          <div className="w-20 h-20 text-6xl flex-none">
            <div className="flex items-center justify-center h-full w-full">
              <div>
              <i className={weatherData?.WeatherIcon ? `wi ${getWeatherIcon(headline?.Category)}` : "wi-na"} style={{ fontSize: 'inherit', lineHeight: '3rem', color: 'orange'}}></i>
              </div>
            </div>
          </div>
          <div className="flex justify-end w-full">
            <div className="text-end">
              <p className='text-sm font-extrabold mb-1'>{headline?.Text || "No Weather :("}</p>
              <p className='text-xs font-normal'>{`Severity Level: ${headline.Severity}`}</p>
              <p className='text-xs font-normal'>{`Min Temprature: ${Math.round(fahrenheitToCelsius(forecastsData?.Temperature?.Minimum?.Value))}°C`}</p>
              <p className='text-xs font-normal'>{`Min Temprature: ${Math.round(fahrenheitToCelsius(forecastsData?.Temperature?.Maximum?.Value))}°C`}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
});

export default Weather;
