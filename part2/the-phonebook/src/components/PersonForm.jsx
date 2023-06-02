import React from 'react';

export default function PersonForm({ onSubmit, onChange, onChangeTwo }) {
  return (
    <form onSubmit={onSubmit}>
      <div>
        name: <input onChange={onChange} />
      </div>
      <div>
        number: <input onChange={onChangeTwo} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
}
