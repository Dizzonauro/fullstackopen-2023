import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import City from './components/City';
import FilteredCountry from './components/FilteredCountry';
import _ from 'lodash';

function App() {
  const [searchName, setSearchName] = useState('');
  const [countries, setCountries] = useState([]);
  const debouncedSearch = useCallback(
    _.debounce((value) => {
      setSearchName(value);
    }, 100),
    [],
  );

  const onSearch = (e) => {
    e.preventDefault();
    debouncedSearch(e.target.value);
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

  const renderCountry = () => {
    if (countries.length > 10) {
      return <div>Too many matches, specify another filter</div>;
    } else if (countries.length > 1 && countries.length <= 10) {
      const specs = countries.map((country) => (
        <City key={country.name.common} country={country} />
      ));
      return specs;
    } else if (countries.length === 1) {
      return <FilteredCountry country={countries[0]} />;
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
