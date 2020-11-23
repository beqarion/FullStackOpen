import React from 'react'
import Person from './Person'

const Persons = ({contactsToShow}) => {
    return contactsToShow.map( person => 
        <Person name={person.name} number={person.number} key={person.name} />
    )
}

export default Persons