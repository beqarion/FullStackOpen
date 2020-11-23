import React, { useState } from 'react'
import Person from './Person'

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')

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
      const contact = {name: newName}
      setPersons(persons.concat(contact))
      setNewName('')
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleSubmit}>
        <div>
          name: <input value={newName} onChange={handleInput} />
        </div>
        <div>
            number: <input value={newNumber} onChange={handleNumber} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map( person => <Person name={person.name} key={person.name}/>)}
    </div>
  )
}

export default App