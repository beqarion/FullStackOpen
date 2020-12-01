import React, { useState, useEffect } from 'react'
import Filter from './Filter'
import PersonForm from './PersonForm'
import Persons from './Persons'
import personServices from '../services/persons'
import Notification from './Notification'

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setFilter ] = useState('')
  const [ notif, setNotif ] = useState({msg:null,type:'success'})

  useEffect(()=>{
    personServices
      .getAll()
      .then((response) => {
        setPersons(response)
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
      const trimWS = n => n.trim().replace(/\s\s+/g, ' ')
      const contact = {name: trimWS(newName), number: newNumber}
      if(persons.some(p => trimWS(p.name) === trimWS(newName))){
        const duplicateObj = persons.find(p=>trimWS(p.name) === trimWS(newName))
        const id = duplicateObj.id
        const newObj = {...duplicateObj, number: newNumber}
        personServices.update(id, newObj)
          .then( response => {
            console.log(response)
            setPersons(persons.map(p => p.id !== id ? p : response))
            setNotif({msg:`Updated ${response.name}`,type:'success'})
          })
          .catch(err => {
            const message = `Information of ${contact.name} has already been removed from server`
            setNotif({msg:message,type:'fail'})
          })
      } else {
        personServices.create(contact)
          .then( response => {
            setPersons(persons.concat(response))
            setNotif({msg:`Added ${response.name}`,type:'success'})
          })
      }
      setTimeout(()=>{setNotif({msg:null,type:null})},3000)
      setNewName('')
      setNewNumber('')
  }
  const deleteContact = (id) => {
    if(window.confirm('Are you sure ?')){
      console.log(`deleting ${id}`)
      personServices.deleteContact(id).catch( err => {
        const message = `The contact has already been removed from server`
        setNotif({msg:message,type:'fail'})
      })
      setTimeout(()=>{setNotif({msg:null,type:null})},3000)
      setPersons(persons.filter(p=>p.id!==id))
    }
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notif.msg} type={notif.type} />
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
      <Persons contactsToShow={contactsToShow} deleteContact={deleteContact} />
    </div>
  )
}

export default App