import React from 'react';

export default function Persons({ persons }) {
  return persons.map((p) => (
    <div key={p.name}>
      {p.name} {p.number}
    </div>
  ));
}
