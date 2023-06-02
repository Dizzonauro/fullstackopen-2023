import React from 'react';

export default function Filter({ filterPerson, onChange }) {
  return (
    <div>
      filter shown with: <input onChange={onChange} />
      {filterPerson &&
        filterPerson.map((p) => <div key={p.name}>{p.name}</div>)}
    </div>
  );
}
