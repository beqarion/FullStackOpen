import React, { useState } from 'react'
import Filter from './Filter'
import PersonForm from './PersonForm'
import Persons from './Persons'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [filter, setFilter] = useState('')

  const contactsToShow = persons.filter((person => {
      const regexp = new RegExp(filter, 'gi')
      return regexp.test(person.name)
  }))
  
  const handleInput = (event) => setNewName(event.target.value)
  const handleNumber = (event) => setNewNumber(event.target.value)

  const handleSubmit = (event) => {
      event.preventDefault()
      if(persons.some( person => {
          return newName.trim().replace(/\s\s+/g, ' ') === person.name.trim().replace(/\s\s+/g, ' ')
      })) {
        alert(`${newName.trim().replace(/\s\s+/g, ' ')} is already added to phonebook`)
        return
      }
      const contact = {name: newName, number: newNumber}
      setPersons(persons.concat(contact))
      setNewName('')
      setNewNumber('')
  }
  
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter setFilter={setFilter} filter={filter}/>
      <h3>add a new</h3>
      <PersonForm 
        handleSubmit={handleSubmit}
        handleInput={handleInput}
        handleNumber={handleNumber}
        newName={newName}
        newNumber={newNumber}
      />
      <h3>Numbers</h3>
      <Persons contactsToShow={contactsToShow} />
    </div>
  )
}

export default App