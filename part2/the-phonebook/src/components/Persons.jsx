import React from 'react';

export default function Persons({ persons, onItemClicked }) {
  return persons.map((p) => (
    <div key={p.id}>
      {p.name} {p.number}{' '}
      <button
        onClick={() => {
          onItemClicked(p.id, p.name);
        }}
      >
        delete
      </button>
    </div>
  ));
}
