// helper.js
export const getWeatherIcon = (iconInput) => {
    // Mapping untuk angka
    const iconMapping = {
      1: 'wi-day-sunny',           // Sunny
      2: 'wi-day-sunny-overcast',  // Mostly Sunny
      3: 'wi-day-cloudy',          // Partly Sunny
      4: 'wi-cloud',               // Intermittent Clouds
      5: 'wi-day-haze',            // Hazy Sunshine
      6: 'wi-cloudy',              // Mostly Cloudy
      7: 'wi-cloudy',              // Cloudy
      8: 'wi-cloudy',              // Dreary
      11: 'wi-fog',                // Fog
      12: 'wi-rain',               // Showers
      13: 'wi-cloudy-windy',       // Mostly Cloudy w/ Showers
      14: 'wi-day-showers',        // Partly Sunny w/ Showers
      15: 'wi-thunderstorm',       // T-Storms
      16: 'wi-thunderstorm',       // Mostly Cloudy w/ T-Storms
      17: 'wi-day-thunderstorm',   // Partly Sunny w/ T-Storms
      18: 'wi-rain',               // Rain
      19: 'wi-snow',               // Flurries
      20: 'wi-cloudy-windy',       // Mostly Cloudy w/ Flurries
      21: 'wi-day-snow',           // Partly Sunny w/ Flurries
      22: 'wi-snow',               // Snow
      23: 'wi-cloudy-windy',       // Mostly Cloudy w/ Snow
      24: 'wi-rain-mix',           // Ice
      25: 'wi-sleet',              // Sleet
      26: 'wi-rain-mix',           // Freezing Rain
      29: 'wi-rain',               // Rain and Snow
      30: 'wi-hot',                // Hot
      31: 'wi-cold',               // Cold
      32: 'wi-windy',              // Windy
      33: 'wi-night-clear',        // Clear
      34: 'wi-night-partly-cloudy',// Mostly Clear
      35: 'wi-night-cloudy',       // Partly Cloudy
      36: 'wi-cloud',              // Intermittent Clouds
      37: 'wi-night-haze',         // Hazy Moonlight
      38: 'wi-cloudy',             // Mostly Cloudy
      39: 'wi-night-showers',      // Partly Cloudy w/ Showers
      40: 'wi-cloudy-windy',       // Mostly Cloudy w/ Showers
      41: 'wi-night-thunderstorm', // Partly Cloudy w/ T-Storms
      42: 'wi-thunderstorm',       // Mostly Cloudy w/ T-Storms
      43: 'wi-cloudy-windy',       // Mostly Cloudy w/ Flurries
      44: 'wi-cloudy-windy',       // Mostly Cloudy w/ Snow
    };
  
    // Mapping untuk teks
    const textMapping = {
      "sunny": "wi-day-sunny",
      "mostly sunny": "wi-day-sunny-overcast",
      "partly sunny": "wi-day-cloudy",
      "intermittent clouds": "wi-cloud",
      "hazy sunshine": "wi-day-haze",
      "mostly cloudy": "wi-cloudy",
      "cloudy": "wi-cloudy",
      "dreary": "wi-cloudy",
      "fog": "wi-fog",
      "showers": "wi-rain",
      "mostly cloudy w/ showers": "wi-cloudy-windy",
      "partly sunny w/ showers": "wi-day-showers",
      "t-storms": "wi-thunderstorm",
      "mostly cloudy w/ t-storms": "wi-thunderstorm",
      "partly sunny w/ t-storms": "wi-day-thunderstorm",
      "rain": "wi-rain",
      "flurries": "wi-snow",
      "mostly cloudy w/ flurries": "wi-cloudy-windy",
      "partly sunny w/ flurries": "wi-day-snow",
      "snow": "wi-snow",
      "mostly cloudy w/ snow": "wi-cloudy-windy",
      "ice": "wi-rain-mix",
      "sleet": "wi-sleet",
      "freezing rain": "wi-rain-mix",
      "rain and snow": "wi-rain",
      "hot": "wi-hot",
      "cold": "wi-cold",
      "windy": "wi-windy",
      "clear": "wi-night-clear",
      "mostly clear": "wi-night-partly-cloudy",
      "partly cloudy": "wi-night-cloudy",
      "hazy moonlight": "wi-night-haze",
      "partly cloudy w/ showers": "wi-night-showers",
      "partly cloudy w/ t-storms": "wi-night-thunderstorm"
    };
  
    // Cek apakah input adalah angka atau teks
    if (typeof iconInput === "number") {
      return iconMapping[iconInput] || "wi-na"; // Fallback jika tidak ditemukan
    } else if (typeof iconInput === "string") {
      iconInput.toLowerCase()
      return textMapping[iconInput] || "wi-na"; // Fallback jika tidak ditemukan
    }
  
    // Fallback jika input tidak valid
    return "wi-na";
  };
  

  export const renameIconPhrase = (iconPhrase) => {
    if (!iconPhrase.includes("w/")) return iconPhrase;

    return iconPhrase
        .replace(/w\/ showers/i, "with Showers")
        .replace(/w\/ t-Storms/i, "with Thunderstorms")
        .replace(/w\/ flurries/i, "with Flurries")
        .replace(/w\/ snow/i, "with Snow"); 
  }
  