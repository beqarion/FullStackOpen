import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './Filter'
import PersonForm from './PersonForm'
import Persons from './Persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(()=>{
    axios
      .get('http://localhost:3001/persons')
      .then((response) => {
        setPersons(response.data)
      })
  },[])

  const contactsToShow = persons.filter((person => {
      const regexp = new RegExp(filter, 'gi')
      return regexp.test(person.name)
  }))
  
  const handleInput = (event) => setNewName(event.target.value)
  const handleNumber = (event) => setNewNumber(event.target.value)
  const handleChange = event => {setFilter(event.target.value)}
  const handleSubmit = (event) => {
      event.preventDefault()
      if(persons.some( person => {
          return newName.trim().replace(/\s\s+/g, ' ') === person.name.trim().replace(/\s\s+/g, ' ')
      })) {
        alert(`${newName.trim().replace(/\s\s+/g, ' ')} is already added to phonebook`)
        return
      }
      const contact = {name: newName, number: newNumber}
      axios.post('http://localhost:3001/persons',contact)
        .then(response => {
          setPersons(persons.concat(contact))
          setNewName('')
          setNewNumber('')
        })
      
  }
  
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleChange={handleChange} filter={filter}/>
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