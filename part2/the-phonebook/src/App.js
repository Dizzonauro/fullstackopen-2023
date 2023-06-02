import { useState } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 },
  ]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [search, setSearch] = useState('');

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  };
  const handleNumberChange = (e) => {
    setNewNumber(e.target.value);
  };
  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const addPerson = (e) => {
    e.preventDefault();
    if (!newName || !newNumber) {
      return alert('empty input');
    }
    const personObj = {
      name: newName,
      number: newNumber,
    };

    if (persons.find((p) => p.name === newName)) {
      alert(`${newName} is already added to phonebook`);
      return;
    }
    setPersons(persons.concat(personObj));
    setNewNumber('');
    setNewName('');
  };

  const filterPerson =
    search &&
    persons.filter((p) => {
      return p.name.toLocaleLowerCase().includes(search.toLocaleLowerCase());
    });

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filterPerson={filterPerson} onChange={handleSearch} />
      <h3>add a new</h3>
      <PersonForm
        onSubmit={addPerson}
        onChange={handleNameChange}
        onChangeTwo={handleNumberChange}
      />
      <h3>Numbers</h3>
      <Persons persons={persons} />
    </div>
  );
};

export default App;
