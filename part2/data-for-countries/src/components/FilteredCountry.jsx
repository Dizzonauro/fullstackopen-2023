/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios';
import React, { useEffect, useState } from 'react';

function FilteredCountry({ country }) {
  const [weather, setWeather] = useState('');

  const { common } = country.name;
  const { area, capital, flags, languages, latlng } = country;
  const [lat, lng] = latlng;

  const arrLanguages = [];
  for (let [key, value] of Object.entries(languages)) {
    arrLanguages.push(value);
  }

  console.log(process.env.REACT_APP_WEATHER_API_KEY);

  const teste = async () => {
    try {
      const { data } = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${process.env.REACT_APP_WEATHER_API_KEY}`,
      );

      setWeather(data);
    } catch (error) {}
  };

  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      teste();
    }

    return () => {
      isMounted = false;
    };
  }, []);

  const weatherPage = weather && (
    <div>
      <div>Temperature: {(weather?.main?.temp - 273).toFixed(2)} Celsius</div>
      <div>
        <img
          src={`https://openweathermap.org/img/wn/${weather?.weather[0]?.icon}@2x.png`}
          alt={weather?.weather[0]?.description}
        />
      </div>
      <div>wind {weather?.wind?.speed} m/s</div>
    </div>
  );

  return (
    <div>
      <div>
        <h1>{common}</h1>
        <div>Capital: {capital}</div>
        <div>area: {area}</div>
        <h4>Languages:</h4>
        <ul>
          {arrLanguages.map((l) => (
            <li key={l}>{l}</li>
          ))}
        </ul>
        <img style={{ width: '200px' }} src={flags.svg} alt={flags.alt}></img>
        <div>
          <h2>Weather in {common}</h2>
          {weatherPage}
        </div>
      </div>
    </div>
  );
}

export default React.memo(FilteredCountry);
