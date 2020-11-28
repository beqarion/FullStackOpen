import React from 'react'

const Country = ({country}) => {
    if (country === undefined) {return <div></div>}
    return(
        <>
            <h2>{country.name}</h2>
            <div>capital {country.capital}</div>
            <div>population {country.population}</div>
            <h3>languages</h3>
            <div><ul>{country.languages.map((el,i)=><li key={i+1}>{el.name}</li>)}</ul></div>
            <img src={country.flag} style={{width:"100px"}} alt=""/>
        </>
    )
}

export default Country