import { useEffect, useState } from 'react';
import axios from 'axios';
import City from './components/City';

function App() {
  const [searchName, setSearchName] = useState('');
  const [countries, setCountries] = useState([]);

  const onSearch = (e) => {
    e.preventDefault();
    setSearchName(e.target.value);
  };

  useEffect(() => {
    if (searchName) {
      axios
        .get(`https://restcountries.com/v3.1/name/${searchName}`)
        .then((response) => setCountries(response.data))
        .catch((error) => {
          console.log(error);
        });
    }
  }, [searchName]);
  const filteredCountries = {
    names: countries.map((country) => country.name),
    capital: countries.map((country) => country.capital),
    area: countries.map((country) => country.area),
    languages: countries.map((country) => country.languages),
    flags: countries.map((country) => country.flags),
  };

  const renderCountry = () => {
    if (filteredCountries.names.length > 10) {
      return <div>Too many matches, specify another filter</div>;
    } else if (
      filteredCountries.names.length > 1 &&
      filteredCountries.names.length <= 10
    ) {
      const specs = countries.map((country) => (
        <City key={country.name.common} country={country} />
      ));
      return specs;
    } else if (filteredCountries.names.length === 1) {
      const arrLanguages = [];
      for (let [key, value] of Object.entries(filteredCountries.languages[0])) {
        arrLanguages.push(value);
      }
      return (
        <div>
          <h1>{filteredCountries.names[0].common}</h1>
          <div>Capital: {filteredCountries.capital}</div>
          <div>area: {filteredCountries.area}</div>
          <h4>Languages:</h4>
          <ul>
            {arrLanguages.map((l) => (
              <li key={l}>{l}</li>
            ))}
          </ul>
          <img
            style={{ width: '200px' }}
            src={filteredCountries.flags[0].svg}
            alt={filteredCountries.flags[0].alt}
          ></img>
        </div>
      );
    }
  };

  return (
    <div>
      <p>
        Find countries
        <input
          type="text"
          onChange={onSearch}
          placeholder="write the country name"
        />
      </p>
      {renderCountry()}
    </div>
  );
}

export default App;
