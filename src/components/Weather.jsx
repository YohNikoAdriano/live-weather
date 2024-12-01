import React, { memo, useState } from "react";
import { getWeatherIcon, renameIconPhrase } from '../helper';

const Weather = memo(({ weatherData, forecastsData, loc }) => {
    
  const [headline, setHeadline] = useState(forecastsData?.Headline)
  const [mainForecasts, setMainForecasts] = useState(forecastsData?.DailyForecasts[0])
  const [forecasts, setForecasts] = useState(forecastsData?.DailyForecasts)

  const date = new Date(headline.EffectiveDate);
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDate = date.toLocaleDateString('id-ID', options);
  
  return (
    <>
      <div className='text-sm text-left w-11/12 mx-auto pb-6 px-6 mt-10 mb-2 bg-gradient-to-r from-neutral-600 to-transparent rounded-xl shadow-lg'>

        <div className="flex items-start justify-between">
          <div className="inline-block px-3 py-2 bg-gradient-to-r from-sky-800 via-emerald-700 to-emerald-600 rounded-b-lg focus:outline-emerald-400 text-center">
            <p className="text-xs">Today Forecast</p>
          </div>

          <div className="text-right mt-3 ml-2">
            <p className='text-[.6rem] font-extralight'>{formattedDate}</p>
            <p className='text-lg/[1rem] font-medium mb-1'>{loc || "No Location :("}</p>
          </div>
        </div>

        <div className='flex items-center'>
          <div className="w-20 h-20 text-5xl flex-none">
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
          <div className="w-20 h-20 text-5xl flex-none">
            <div className="flex items-center justify-center h-full w-full">
              <div>
              <i className={weatherData?.WeatherIcon ? `wi ${getWeatherIcon(headline?.Category)}` : "wi-na"} style={{ fontSize: 'inherit', lineHeight: '3rem', color: 'orange'}}></i>
              </div>
            </div>
          </div>
          <div className="flex justify-end">
            <div className="text-end">
              <p className='text-sm font-extrabold mb-1'>{headline?.Text || "No Weather :("}</p>
              <p className='text-xs font-medium'>{`Severity Level: ${headline.Severity}`}</p>
              <p className='text-xs font-medium'>{`Min Temprature: ${Math.round(forecasts[0]?.Temperature?.Minimum?.Value)}°F`}</p>
              <p className='text-xs font-medium'>{`Max Temprature: ${Math.round(forecasts[0]?.Temperature?.Maximum?.Value)}°F`}</p>
            </div>
          </div>
        </div>
      </div>

      <div className='text-sm text-left w-11/12 mx-auto pb-6 px-6 mb-2 bg-gradient-to-r from-neutral-600 to-transparent rounded-xl shadow-lg'>
        <div className=" text-left grid grid-cols-2 gap-4">

          <div className="day">
            <div className="inline-block px-3 py-2 mb-2 bg-gradient-to-r from-sky-800 via-emerald-700 to-emerald-600 rounded-b-lg focus:outline-emerald-400">
              <p className="text-xs">Day</p>
            </div>
            <div className='text-5xl font-bold my-3'>
              <i className={mainForecasts?.Day?.Icon ? `wi ${getWeatherIcon(mainForecasts?.Day?.Icon)}` : "wi-na"} style={{ fontSize: 'inherit', color: 'orange'}}></i>
            </div>
            <p className="text-sm font-extrabold mb-1">{renameIconPhrase(mainForecasts?.Day?.IconPhrase)}</p>
            <div className="text-[.6rem]/[.6rem] font-light">
              <p>Precipitation Intensity: <span>{mainForecasts?.Day?.HasPrecipitation ? mainForecasts?.Day?.PrecipitationIntensity : "-"}</span></p>
              <p>Precipitation Type: <span>{mainForecasts?.Day?.HasPrecipitation ? mainForecasts?.Day?.PrecipitationType : "-"}</span></p>
            </div>
          </div>

          <div className="night">
            <div className="inline-block px-3 py-2 mb-2 bg-gradient-to-r from-sky-800 via-emerald-700 to-emerald-600 rounded-b-lg focus:outline-emerald-400">
              <p className="text-xs">Night</p>
            </div>
            <div className='text-5xl font-bold my-3'>
              <i className={mainForecasts?.Night?.Icon ? `wi ${getWeatherIcon(mainForecasts?.Night?.Icon)}` : "wi-na"} style={{ fontSize: 'inherit', color: 'orange'}}></i>
            </div>
            <p className="text-sm font-extrabold mb-1">{renameIconPhrase(mainForecasts?.Night?.IconPhrase)}</p>
            <div className="text-[.6rem]/[.6rem] font-light">
              <p>Precipitation Intensity: <span>{mainForecasts?.Night?.HasPrecipitation ? mainForecasts?.Night?.PrecipitationIntensity : "-"}</span></p>
              <p>Precipitation Type: <span>{mainForecasts?.Night?.HasPrecipitation ? mainForecasts?.Night?.PrecipitationType : "-"}</span></p>
            </div>
          </div>

        </div>
      </div>
    </>
  );
});

export default Weather;
