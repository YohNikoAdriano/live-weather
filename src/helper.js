// helper.js
export const getWeatherIcon = (iconNumber) => {
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
  
    // Return icon class based on WeatherIcon number
    return iconMapping[iconNumber] || 'wi-na'; // 'wi-na' is a default for unknown icons
  };
  