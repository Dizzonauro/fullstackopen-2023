import React from 'react';

export default function PersonForm({
  onSubmit,
  onChange,
  onChangeTwo,
  value1,
  value2,
}) {
  return (
    <form onSubmit={onSubmit}>
      <div>
        name: <input value={value1} onChange={onChange} />
      </div>
      <div>
        number: <input value={value2} onChange={onChangeTwo} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
}
