import React from 'react'
import Country from './Country'

const Content = ({countries,printCountry}) => {
    let length = countries.length
    if (length === 1){
        return <Country country={countries[0]} />
    }else if (length > 10) {
        return <div>Too many matches, specify another filter</div>
    } else if ( length <= 10 && length > 1) {
        console.log(countries)
        return <>
            {countries.map((c,i)=><div key={c.name}>
                {c.name}
                <button onClick={()=>{printCountry([c])}}>show</button>
            </div>)}
        </>
    }
    return <></>
}

export default Content