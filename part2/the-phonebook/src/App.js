import { useState, useEffect } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';

import personsService from './services/persons';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [search, setSearch] = useState('');

  useEffect(() => {
    personsService
      .getAll()
      .then((initialPersons) => setPersons(initialPersons));
  }, []);

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
    personsService.create(personObj).then((returnedPerson) => {
      setPersons(persons.concat(returnedPerson));
      setNewNumber('');
      setNewName('');
    });
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
