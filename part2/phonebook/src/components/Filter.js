import React from 'react'

const Filter = ({filter, setFilter}) => {

    const handleChange = event => {setFilter(event.target.value)}

    return(
        <>
            filter shown with <input onChange={handleChange} value={filter} />
        </>
    )
}
    
export default Filter