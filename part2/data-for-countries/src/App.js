import { useEffect, useState } from 'react';
import axios from 'axios';

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
  const names = countries.map((country) => country.name);
  const capital = countries.map((country) => country.capital);
  const area = countries.map((country) => country.area);
  const languages = countries.map((country) => country.languages);
  const flags = countries.map((country) => country.flags);

  const renderCountry = () => {
    if (names.length > 10) {
      return <div>Too many matches, specify another filter</div>;
    } else if (names.length > 1 && names.length <= 10) {
      return names.map((n) => <div key={n.common}>{n.common}</div>);
    } else if (names.length === 1) {
      const arrLanguages = [];
      for (let [key, value] of Object.entries(languages[0])) {
        arrLanguages.push(value);
      }
      return (
        <div>
          <h1>{names[0].common}</h1>
          <div>Capital: {capital}</div>
          <div>area: {area}</div>
          <h4>Languages:</h4>
          <ul>
            {arrLanguages.map((l) => (
              <li key={l}>{l}</li>
            ))}
          </ul>
          <img
            style={{ width: '200px' }}
            src={flags[0].svg}
            alt={flags.alt}
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
