import React from 'react'
import Person from './Person'

const Persons = ({contactsToShow,deleteContact}) => {
    return contactsToShow.map( person => 
        <Person name={person} number={person.number} key={person.name} deleteContact={deleteContact}/>
    )
}

export default Persons