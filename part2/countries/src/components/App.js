import React, {useState, useEffect} from 'react'
import axios from 'axios'
// import Country from './Country'
import Content from './Content'
import Search from './Search'


const App = () => {
    const [input, setInput] = useState('')
    const [countries, setCountries] = useState([])
    const [filteredCountries, setFilteredCountries] = useState([])
    console.log(filteredCountries)
    useEffect(()=>{
        axios
            .get('https://restcountries.eu/rest/v2/all')
            .then(result=>{setCountries(result.data)})
    }, [])
    const handleInput = (e) => {
        setInput(e.target.value)
        filterCountries(e.target.value)
    }
    const filterCountries = (input) => {
        if (input === ''|| input === ' ') {
            setFilteredCountries([])
            return
        }
        const resultCountries = countries.filter(country => {
           return new RegExp(input, 'gi').test(country.name)
        })
        setFilteredCountries(resultCountries)
    }
    return (
        <div>
            <Search value={input} onChange={handleInput}/>
            <Content countries={filteredCountries} printCountry={setFilteredCountries} />
        </div>
    )
}



export default App