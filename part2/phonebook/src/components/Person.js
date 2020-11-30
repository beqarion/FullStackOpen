import React from 'react'

const Person = ({name,number,deleteContact}) => {
    return<div>
        <>{name.name} {number} </>
        <button onClick={()=>{deleteContact(name.id)}}>Delete</button>
    </div>
    
}

export default Person