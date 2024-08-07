import axios from "axios";

const getWeather = (countryName, cityName) => {
    
    return axios
    
        .get(`https://api.openweathermap.org/data/2.5/weather?q=${cityName},${countryName}&appid=d4b03437a149dd5ac3c509b664090a8a`, {
            params: {
                name: `${cityName}, ${countryName}`,
                units: 'metric',
                lang: 'en'
            }
        })
        .then((response) => {
            const result = response.data.results[0];
            return axios
              .get(`http://api.openweathermap.org/data/2.5/forecast?id=524901&appid={d4b03437a149dd5ac3c509b664090a8a}`, {
                params: {
                    latitude: result.latitude,
                    longitude: result.longitude,
                    current_weather: true
                }
              });
        })
        .then((response) => {
            return response.data
        });
};

export default { getWeather }