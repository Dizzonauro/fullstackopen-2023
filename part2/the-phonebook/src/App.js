import { useState, useEffect } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';

import personsService from './services/persons';
import { Notification } from './components/Notification';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [search, setSearch] = useState('');
  const [success, setSuccess] = useState(null);
  const [typeMessage, setTypeMessage] = useState('success');

  useEffect(() => {
    personsService
      .getAll()
      .then((initialPersons) => setPersons(initialPersons));
  }, []);

  const deletePerson = async (id, name) => {
    attComponent();
    const result = window.confirm(`Delete ${name}?`);
    if (result) {
      try {
        await personsService.removePerson(id);
        attComponent();
        setTypeMessage('success');
        setSuccess(`Information for ${name} has been removed from server`);
        setTimeout(() => {
          setSuccess(null);
        }, 2000);
      } catch (error) {
        setSuccess(
          `Information for ${name} has already been removed from server`,
        );
        setTypeMessage('error');
        setTimeout(() => {
          setSuccess(null);
        }, 2000);
      }
    }
  };

  const attComponent = async () => {
    try {
      const data = await personsService.getAll();
      setPersons(data);
    } catch (error) {
      console.log('att error: ', error);
    }
  };

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

    if (persons.find((p) => p.name === newName && p.number !== newNumber)) {
      const { id, name } = persons.find((p) => p.name === newName);
      const result = window.confirm(
        `${name} is already added to phonebook, replace the old number with a new one?`,
      );
      if (result) {
        const changedNumber = { ...personObj, number: newNumber };
        personsService.update(id, changedNumber).then((returnedPerson) => {
          setPersons(persons.map((p) => (p.id !== id ? p : returnedPerson)));
        });
        setTypeMessage('success');
        setSuccess(
          `Added the new number ${newNumber} to the contact: ${newName}`,
        );
        setTimeout(() => {
          setSuccess(null);
        }, 2000);
        setNewNumber('');
        setNewName('');
        return;
      }
    } else if (persons.find((p) => p.name === newName)) {
      alert(`${newName} is already added to phonebook`);
      return;
    } else {
      personsService.create(personObj).then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson));
      });
      setSuccess(`Added ${newName}`);
      setTypeMessage('success');
      setTimeout(() => {
        setSuccess(null);
      }, 2000);
      setNewNumber('');
      setNewName('');
    }
  };

  const filterPerson =
    search &&
    persons.filter((p) => {
      return p.name.toLocaleLowerCase().includes(search.toLocaleLowerCase());
    });

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={success} type={typeMessage} />
      <Filter filterPerson={filterPerson} onChange={handleSearch} />
      <h3>add a new</h3>
      <PersonForm
        onSubmit={addPerson}
        onChange={handleNameChange}
        onChangeTwo={handleNumberChange}
        value1={newName}
        value2={newNumber}
      />
      <h3>Numbers</h3>
      <Persons persons={persons} onItemClicked={deletePerson} />
    </div>
  );
};

export default App;
