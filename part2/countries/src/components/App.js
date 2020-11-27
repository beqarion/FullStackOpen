import React, {useState, useEffect} from 'react'
import axios from 'axios'
import Country from './Country'


const App = () => {
    const [input, setInput] = useState('')
    const [countries, setCountries] = useState([])
    useEffect(()=>{
        axios
            .get('https://restcountries.eu/rest/v2/all')
            .then(result=>{setCountries(result.data)})
    }, [])

    const handleInput = (e) => {setInput(e.target.value)}
    const filterCountries = (input) => {
        // const resultCountries = input.
    }
    console.log(countries[0])
    return(
        <div>
            find countries <input value={input} onChange={handleInput}/>
            <Country country={countries[5]} />
        </div>
    )
}



export default App