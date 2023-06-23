import React, { useState } from 'react';

export default function City({ country }) {
  const [show, setShow] = useState(false);
  const { common } = country.name;
  const { area, capital, flags, languages } = country;
  const arrLanguages = [];
  for (let [key, value] of Object.entries(languages)) {
    arrLanguages.push(value);
  }

  return (
    <div>
      {common}
      <button onClick={() => setShow(!show)}>Show</button>
      {show && (
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
          <img src={flags.png} alt={flags.alt} />
        </div>
      )}
    </div>
  );
}
