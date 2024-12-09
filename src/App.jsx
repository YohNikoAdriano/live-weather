import { useState, useEffect, useRef } from 'react'
import './App.css'
import axios from 'axios'
import { getWeatherIcon } from './helper';
import CitiesCard from './components/CitiesCard';
import Weather from './components/Weather';
import Error from './components/Error';
import Loading from './components/Loading';
import ForecastsCarousel from './components/ForecastsCarousel';

function App() {

  // User Information
  const [time, setTime] = useState(new Date())
  const [greeting, setGreeting] = useState("")
  const [initialLocationKey, setInitialLocationKey] = useState("")
  const [city, setCity] = useState("")

  // Initial Weather
  const [initialWeather, setInitialWeather] = useState([])
  const [initialWeatherIcon, setInitialWeatherIcon] = useState("");

  // Autocomplete and City Data by Searching
  const [keyword, setKeyword] = useState('')
  const [autoCompleteResults, setAutoCompleteResults] = useState([])
  const [citySearched, setCitySearched] = useState("")
  const [citySearchedData, setCitySearchedData] = useState([])
  const [isSearchEntered, setIsSearchEntered] = useState(false)
  const [isResultsClicked, setIsResultsClicked] = useState(false)

  // Forecasts by Searching
  const [weather, setWeather] = useState([])
  const [forecasts, setForecasts] = useState({})
  const [forecastsLocation, setForecastsLocation] = useState("")
  
  // Error and Loading
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const timeoutRef = useRef(null);
  const apiCallCount = useRef(
    parseInt(localStorage.getItem("apiCallCount"), 10) || 0
  );

  // Private API Key Accuweather 
  const API_KEY = import.meta.env.VITE_API_ACCU_KEY
  const API_URL = import.meta.env.VITE_API_ACCU_URL

  // API Url for Function
  const API_LOC_BY_IP = (ip) => `${API_URL}/locations/v1/cities/ipaddress?apikey=${API_KEY}&q=${ip}`
  const API_LOC_BY_LAT_LONG = (lat, lon) => `${API_URL}/locations/v1/cities/geoposition/search?apikey=${API_KEY}&q=${lat},${lon}`
  const API_W_BY_LOC_KEY = (locationKey) => `${API_URL}/currentconditions/v1/${locationKey}?apikey=${API_KEY}`
  const API_LOC_BY_CITY = `${API_URL}/locations/v1/search?apikey=${API_KEY}&q=${citySearched}`
  const API_AUTOCOMPLETE = `${API_URL}/locations/v1/cities/autocomplete?apikey=${API_KEY}&q=${keyword}`
  const API_F_BY_LOC_KEY = (locationKey) => `${API_URL}/forecasts/v1/daily/5day/${locationKey}?apikey=${API_KEY}`

  // Count API Calls
  const updateApiCallCount = (newCount) => {
    apiCallCount.current = newCount;
    localStorage.setItem('apiCallCount', newCount);
  };

  // INITIAL WEATHER
  useEffect(() => {
    const fetchLocationData = async (lat, lon) => {
      setIsLoading(true);
      try {
        const response = await axios.get(API_LOC_BY_LAT_LONG(lat, lon));
        apiCallCount.current += 1;
        // console.log("success fetch lat long " + apiCallCount.current);
        // console.log(response.data);
        setInitialLocationKey(response.data.Key);

        localStorage.setItem('initialCity', `${response.data.LocalizedName}, ${response.data.Country.LocalizedName}`);
        
        setCity(`${response.data.LocalizedName}, ${response.data.Country.LocalizedName}`);
        
      } catch (error) {
        console.error("Error fetching location by lat/long", error);
      } finally {
        setIsLoading(false);
      }
    };

    const fetchLocationByIP = async () => {
      setIsLoading(true);
      try {
        const ipResponse = await axios.get("https://api.ipify.org?format=json");
        const locationResponse = await axios.get(API_LOC_BY_IP(ipResponse.data.ip));
        apiCallCount.current += 1;
        // console.log("success fetch ip " + apiCallCount.current);
        // console.log(locationResponse.data);
        setInitialLocationKey(locationResponse.data.Key);
        
        localStorage.setItem('initialCity', `${locationResponse.data.LocalizedName}, ${locationResponse.data.Country.LocalizedName}`);
        
        setCity(`${locationResponse.data.LocalizedName}, ${locationResponse.data.Country.LocalizedName}`);
        
      } catch (error) {
        console.error("Error fetching location by IP", error);
      } finally {
        setIsLoading(false);
      }
    };

    // Get Initial Weather Data from Local Storage 
    const localStorageInitialCity = localStorage.getItem("initialCity")
    const localStorageInitialWeather = JSON.parse(localStorage.getItem("initialWeatherLocal"))

    if(localStorageInitialWeather !== null && localStorageInitialCity !== ""){
      setCity(localStorageInitialCity)
      setInitialWeather(localStorageInitialWeather);
      setInitialWeatherIcon(getWeatherIcon(localStorageInitialWeather.WeatherIcon));
    } else{
    // Get Location
    // 1. Get Lat/Long by Navigator Geolocation
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log("Location by Lat Long");
          fetchLocationData(position.coords.latitude, position.coords.longitude);
        },
        // 2. Get IP Adress
        (error) => {
          console.log("User denied geolocation access! : " + error);
          console.log("Location by IP");
          fetchLocationByIP();
        }
      );
    } else {
      setError("Geolocation is not supported by this browser!");
    }  
    }

    // Get Time
    const interval = setInterval(() => {
      setTime(new Date())
      const currentHour = new Date().getHours()
      setGreeting(
        currentHour < 12 
          ? "Good Morning!" 
          : currentHour < 18 
          ? "Good Afternoon!" 
          : "Good Evening!"
      );
    }, 1000)
    return () => clearInterval(interval)

  }, [])

  useEffect(() => {
    const apiCallDone = sessionStorage.getItem("apiCallDone");
    // console.log("API CALL DONE: " + apiCallDone);
    
    if (apiCallDone === null || apiCallDone !== "true") {

      if (initialLocationKey !== "") {
        const fetchInitialWeather = async () => {
          setIsLoading(true);
          try {
            const response = await axios.get(API_W_BY_LOC_KEY(initialLocationKey));
            apiCallCount.current += 1;
            // console.log("success fetch initial weather " + apiCallCount.current);
  
            localStorage.setItem('initialWeatherLocal', JSON.stringify(response.data[0]));
  
            setInitialWeather(response.data[0]);
            setInitialWeatherIcon(getWeatherIcon(response.data[0].WeatherIcon));
  
            sessionStorage.setItem("apiCallDone", "true");

          } catch (error) {
            console.error("Error fetching initial weather data", error);
          } finally {
            setIsLoading(false);
          }
        };
  
        fetchInitialWeather(); 
      }
    } else {
      console.log("API sudah dipanggil sebelumnya.");
    }
  }, [initialLocationKey]); 

  // INPUT HANDLE
  // When Input Triggered
  const onInputChange = (target) => {
    // console.log(target)
    // console.log("keyword updated " + keyword)
    setKeyword(target)
    setIsSearchEntered(false)
    setIsResultsClicked(false)
    setWeather([])
    setForecasts({})
    setForecastsLocation("")
    setCitySearched(target);
    if (target.length >= 3) {
      if (timeoutRef.current) clearTimeout(timeoutRef.current); // Clear previous debounce
      timeoutRef.current = setTimeout(() => {
        autocomplete(target);
      }, 300);
    }
  }

  // Autocomplete City Search
  const autocomplete = async () => {
    // setIsLoading(true)
    try {
      const response = await axios.get(API_AUTOCOMPLETE)
      updateApiCallCount(apiCallCount.current + 1)
      const limitedResults = response.data.slice(0, 5);
      setAutoCompleteResults(limitedResults)
    } 
    catch(error) {
      setError("Error fetching autocomplete: " + error)
    }
    finally {
      // setIsLoading(false) 
    }
  }

  // Searching Location by City
  const searchLocation = async (e) => {
    if(e.key === "Enter"){
      setIsLoading(true)
      setIsSearchEntered(true)
      try {
        const response = await axios.get(API_LOC_BY_CITY)
        updateApiCallCount(apiCallCount.current + 1)
        const limitedResults = response.data.slice(0, 6);
        setCitySearchedData(limitedResults)
      } 
      catch(error) {
        setError("Error fetching cities data: " + error)
      }
      finally {
        setIsLoading(false)
      }
    }
  }

  // Get 5 days Daily Forecast when Autocomplete or Cities Card Clicked
  const getForecasts = async (key, loc, country) => {
    setIsLoading(true)
    setIsResultsClicked(true)
    try {
      const wResponse = await axios.get(API_W_BY_LOC_KEY(key));
      updateApiCallCount(apiCallCount.current + 1)
      // console.log("success fetch weather");
      setWeather(wResponse.data[0])
      const fResponse = await axios.get(API_F_BY_LOC_KEY(key));
      updateApiCallCount(apiCallCount.current + 1)
      // console.log("success fetch forecasts");
      setForecasts(fResponse.data)
      setForecastsLocation(`${loc}, ${country}`)
      // setWeatherIcon(getWeatherIcon(response.data[0].WeatherIcon));
    } catch (error) {
      setError("Error fetching weather data: " + error)
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) return <Loading />;
  if (error) return <Error message={error} />;

  return (
    <>
      <div className="w-100 h-100 relative">
        <p>API Calls: {apiCallCount.current}</p>
        <div className='user-information text-sm w-11/12 mx-auto p-6 my-6 bg-gradient-to-r from-neutral-600 to-transparent rounded-xl shadow-lg hover:cursor-pointer'>
          <div className='flex items-center justify-between'>
            <div className='w-20 h-20 text-5xl flex items-center justify-center'>
              <i className={initialWeatherIcon ? `wi ${initialWeatherIcon}` : "wi-na"} style={{ fontSize: 'inherit', lineHeight: '3rem', color: 'orange'}}></i>
            </div>
            <div className='text-end'>
              <p className='text-[.6rem] font-extralight'>{time.toLocaleTimeString()}</p>
              <p className='text-lg font-medium'>{city || "No Location :("}</p>
              <p className='text-[0.55rem]/[0.6rem] font-extralight'>{location.lat && location.lon ? `${location.lat}, ${location.lon}` : ''}</p>
              <div className='mt-2 flex justify-end'>
                <div className='mr-2 text-xs font-medium'>
                  <p>{Math.round(initialWeather?.Temperature?.Metric?.Value)}°C</p>
                  <p>{Math.round(initialWeather?.Temperature?.Imperial?.Value)}°F</p>
                </div>
                <span className='text-xl font-extrabold border-l-2 pl-2'>{initialWeather.WeatherText || "No Weather :("}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="intro my-5 w-11/12 mx-auto">
          <h1 className="text-2xl font-extrabold mb-2">
            {greeting}
          </h1>
          <h2 className='text-lg font-semibold'>Welcome to the Live Weather Application</h2>
          
          <div className='my-5 w-3/4 mx-auto text-sm'>
            <input 
              type="text" 
              className={`w-full py-3 px-6 bg-gradient-to-r from-sky-900 via-emerald-800 to-emerald-700 opacity-70 focus:outline-emerald-400 placeholder:text-gray-100 shadow-inner ${autoCompleteResults.length > 0 && !isSearchEntered && !isResultsClicked ? 'rounded-t-xl' : 'rounded-xl'}`} 
              placeholder='Search City ...' 
              value={citySearched} 
              onChange={(e) => {onInputChange(e.target.value)}}
              onKeyDownCapture={searchLocation}
            />

            {autoCompleteResults.length > 0 && !isSearchEntered && !isResultsClicked && (
              <ul className="mt-0 w-full bg-gradient-to-r from-sky-900 via-emerald-800 to-emerald-700 rounded-b-xl opacity-70 shadow-inner overflow-auto">
                {autoCompleteResults.map((result, index) => (
                <li
                  key={index}
                  className="px-6 py-2 hover:bg-gradient-to-r from-neutral-700 to-transparent cursor-pointer text-left"
                  onClick={() => {
                    setCitySearched(result.LocalizedName);
                    getForecasts(result.Key, result.LocalizedName, result.Country.LocalizedName);
                  }}
                >
                  {result.LocalizedName}, {result.AdministrativeArea.LocalizedName}, {result.Country.LocalizedName}
                </li>
                ))}
              </ul>
            )}
          </div>

        </div>
        
      </div>

      {citySearchedData.length > 0 && !isResultsClicked && (
        <div className='grid grid-cols-2 gap-3'>
          {citySearchedData.map((item, index) => (
            <CitiesCard key={index} data={item} index={index+1} cardClicked={getForecasts}/>
          ))}
        </div>
      )}

      {Object.keys(forecasts).length > 0 && isResultsClicked && (
        <div>
          <Weather weatherData={weather} headline={forecasts?.Headline} forecastsData={forecasts?.DailyForecasts[0]} loc={forecastsLocation}/>
        
        <ForecastsCarousel forecasts={forecasts?.DailyForecasts}/>
        </div>
      )}
      
      {error && <p>{error}</p>}

    </>
  )
}

export default App
