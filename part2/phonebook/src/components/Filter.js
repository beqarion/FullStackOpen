import React from 'react'

const Filter = ({filter, handleChange}) => {

    

    return(
        <>
            filter shown with <input onChange={handleChange} value={filter} />
        </>
    )
}
    
export default Filter