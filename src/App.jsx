import { useState, useEffect } from 'react'
import './App.css'
import axios from 'axios'
import { getWeatherIcon } from './helper';
import CitiesCard from './components/CitiesCard';

function App() {

  // User Information
  const [time, setTime] = useState(new Date())
  const [greeting, setGreeting] = useState("")
  const [location, setLocation] = useState({ lat: null, lon: null });
  const [ip, setIp] = useState("")
  const [initialLocationKey, setInitialLocationKey] = useState("")
  const [city, setCity] = useState("")

  // Initial Weather
  const [initialWeather, setInitialWeather] = useState({})
  const [initialWeatherIcon, setInitialWeatherIcon] = useState('');

  // Autocomplete and City Data by Searching
  const [keyword, setKeyword] = useState('')
  const [autoCompleteResults, setAutoCompleteResults] = useState([])
  const [citySearched, setCitySearched] = useState("")
  const [data, setData] = useState([])

  // Weather by Searching
  const [locationKey, setLocationKey] = useState("")
  const [weather, setWeather] = useState({})
  const [weatherIcon, setWeatherIcon] = useState('');

  // Error and Loading
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Private API Key Accuweather 
  const API_KEY = import.meta.env.VITE_API_ACCU_KEY
  const API_URL = import.meta.env.VITE_API_ACCU_URL

  // API Url for Function
  const API_LOC_BY_IP = `${API_URL}/locations/v1/cities/ipaddress?apikey=${API_KEY}&q=${ip}`
  const API_LOC_BY_LAT_LONG = `${API_URL}/locations/v1/cities/geoposition/search?apikey=${API_KEY}&q=${location.lat},${location.lon}`
  const API_IW_BY_LOC_KEY = `${API_URL}/currentconditions/v1/${initialLocationKey}?apikey=${API_KEY}`

  const API_W_BY_LOC_KEY = (locationKey) => `${API_URL}/currentconditions/v1/${locationKey}?apikey=${API_KEY}`
  const API_LOC_BY_CITY = `${API_URL}/locations/v1/search?apikey=${API_KEY}&q=${citySearched}`
  const API_AUTOCOMPLETE = `${API_URL}/locations/v1/cities/autocomplete?apikey=${API_KEY}&q=${keyword}`

  useEffect(() => {
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

    // Get Location
    // 1. Get Lat/Long by Navigator Geolocation
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition((position) => {
        setLocation({
          lat: position.coords.latitude,
          lon: position.coords.longitude
        })
      },
      (err) => {
        // 2. Get IP Adress
        fetch("https://api.ipify.org?format=json")
        .then(response => response.json())
        .then(data => setIp(data.ip))
        .catch(error => console.error("Error fetching IP:", error));
        console.log(err.message)
        setError("User denied geolocation access!")
      })
    } else {
      setError("Geolocation is not supported by this browser!");
    }

    return () => clearInterval(interval)

  }, [])

  useEffect(() => {
    const fetchWeatherByLatLong = async () => {
      try {
        const response = await axios.get(API_LOC_BY_LAT_LONG);
        console.log("success fetch lat long");
        setInitialLocationKey(response.data.Key); 
        setCity(`${response.data.LocalizedName}, ${response.data.Country.LocalizedName}`);
      } catch (error) {
        console.error("Error fetching location by lat/long:", error);
      }
    };
  
    const fetchWeatherByIp = async () => {
      try {
        const response = await axios.get(API_LOC_BY_IP);
        console.log("success fetch ip");
        setInitialLocationKey(response.data.Key); 
        setCity(`${response.data.LocalizedName}, ${response.data.Country.LocalizedName}`);
      } catch (error) {
        console.error("Error fetching location by IP:", error);
      }
    };
  
    const fetchWeatherData = async () => {
      if (initialLocationKey) {
        try {
          const response = await axios.get(API_W_BY_LOC_KEY(initialLocationKey));
          console.log("success fetch weather");
          console.log(response.data[0]);
          setInitialWeather(response.data[0]);
          setInitialWeatherIcon(getWeatherIcon(response.data[0].WeatherIcon));
        } catch (error) {
          setError(`Error fetching weather data: ${error}`);
        }
      }
    };
  
    // Use Lat/Long or IP
    if (location.lat && location.lon) {
      fetchWeatherByLatLong();
    } else {
      fetchWeatherByIp();
    }
  
    // Fetch Initial Weather Data by Initial Location Key
    if (initialLocationKey) {
      fetchWeatherData();
    }

  }, [initialLocationKey]); 

  // When Input Triggered
  const onInputChange = (target) => {
    console.log(target)
    setKeyword(target);
    console.log("keyword updated " + keyword)
    setCitySearched(target);
    if(target.length >= 3) {
      autocomplete();
    };
  }

  // Autocomplete City Search
  const autocomplete = async () => {
    console.log("hehe")
    setIsLoading(true)
    try {
      const response = await axios.get(API_AUTOCOMPLETE)
      const limitedResults = response.data.slice(0, 5);
      setAutoCompleteResults(limitedResults)
    } 
    catch(error) {
      console.error("Error fetching autocomplete:", error);
    }
    finally {
      // setCitySearched('')
      setIsLoading(false) 
    }
  }

  // Searching by City
  const search = async (e) => {
    if(e.key === "Enter"){
      setIsLoading(true)
      try {
        const response = await axios.get(API_LOC_BY_CITY)
        setData(response.data)
      } 
      catch(error) {
        console.error("Error fetching data:", error);
      }
      finally {
        // setCitySearched('')
        setIsLoading(false)
        
      }
    }
  }

  // Handle Cities Card Clicked
  const handleCardClicked = async (cityCardKey) => {
    console.log("ini card yang dipilih")
    console.log(cityCardKey)
    const url = API_W_BY_LOC_KEY(cityCardKey);
  console.log("URL yang dibentuk:", url); 
    try {
      const response = await axios.get(API_W_BY_LOC_KEY(cityCardKey));
      console.log("success fetch weather");
      console.log(response.data[0]);
      setWeather(response.data[0]);
      setWeatherIcon(getWeatherIcon(response.data[0].WeatherIcon));
    } catch (error) {
      setError(`Error fetching weather data: ${error}`);
    }
  }

  return (
    <>
      <div className="w-100 h-100 relative">

        <div className='user-information text-sm flex items-center justify-around p-5 my-10 bg-gradient-to-r from-neutral-700 to-transparent rounded-lg shadow-lg hover:cursor-pointer'>
          <div className='mr-3 text-6xl font-bold'>
            <i className={initialWeatherIcon ? `wi ${initialWeatherIcon}` : "wi-na"} style={{ fontSize: 'inherit', color: 'orange'}}></i>
          </div>
          <div className='text-end'>
            <p className='text-xs font-extralight'>{time.toLocaleTimeString()}</p>
            <p className='text-lg font-medium'>{city || "No Location :("}</p>
            <p className='text-[0.55rem]/[0.6rem] font-extralight'>{location.lat && location.lon ? `${location.lat}, ${location.lon}` : ''}</p>
            <div className='mt-2 flex'>
              <div className='mr-2 text-xs font-medium'>
                <p>{Math.round(initialWeather?.Temperature?.Metric?.Value)}°C</p>
                <p>{Math.round(initialWeather?.Temperature?.Imperial?.Value)}°F</p>
              </div>
              <span className='text-xl font-extrabold border-l-2 pl-2'>{initialWeather.WeatherText || "No Weather :("}</span>
            </div>
          </div>
        </div>

        <div className="intro my-5 w-4/5 mx-auto">
          <h1 className="text-2xl font-extrabold mb-2">
            {greeting}
          </h1>
          <h2 className='text-lg font-semibold'>Welcome to the Live Weather Application</h2>
          
          <div className='my-5 w-3/4 mx-auto text-sm'>
            <input 
              type="text" 
              className={`w-full py-3 px-6 bg-gradient-to-r from-sky-900 via-emerald-800 to-emerald-700 opacity-70 focus:outline-emerald-400 placeholder:text-gray-100 shadow-inner ${autoCompleteResults.length > 0 ? 'rounded-t-xl' : 'rounded-xl'}`} 
              placeholder='Search City ...' 
              value={citySearched} 
              onChange={(e) => {onInputChange(e.target.value)}}
              onKeyDownCapture={search}
            />

            {autoCompleteResults.length > 0 && (
              <ul className="mt-0 w-full bg-gradient-to-r from-sky-900 via-emerald-800 to-emerald-700 rounded-b-xl opacity-70 shadow-inner overflow-auto">
                {autoCompleteResults.map((result, index) => (
                <li
                  key={index}
                  className="px-6 py-2 hover:bg-gradient-to-r from-neutral-700 to-transparent cursor-pointer text-left"
                  onClick={() => {
                    setCitySearched(result.LocalizedName); 
                    search(result.LocalizedName)
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

      {isLoading && <p>Loading...</p>}
      <div className='grid grid-cols-2 gap-3'>
        {data.map((item, index) => (
          <CitiesCard key={index} data={item} index={index+1} cardClicked={handleCardClicked}/>
        ))}
      </div>
      
      {/* {initialWeather && (
        <div>
          
          <p>Temperature: {initialWeather.Temperature.Metric.Value} °C</p>
        </div>
      )} */}
      {error && <p>{error}</p>}
    </>
  )
}

export default App
