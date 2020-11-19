import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodBtn = () => setGood(good+1)
  const handleNeutBtn = () => setNeutral(neutral+1)
  const handleBadBtn = () => setBad(bad+1)
  return (
    <div>
      <h1>give feedback</h1>
      <Btn  handleClick={handleGoodBtn} text="Good"/>
      <Btn  handleClick={handleNeutBtn} text="Neutral"/>
      <Btn  handleClick={handleBadBtn} text="Bad"/>
      <Statistics good={good}neutral={neutral}bad={bad} />
    
    </div>
  )
}
const Btn = ({handleClick, text}) => {
  return (
    <button onClick={handleClick}>
      {text}
    </button>
  )
}
const Statistics = ({good, neutral, bad}) => {
  const sum = good + neutral + bad;
  return (
    <>
      <h1>statistics</h1>
      good {good} <br/>
      neutral {neutral} <br/>
      bad {bad} <br/>
    </>
  )
}
ReactDOM.render(<App />, 
  document.getElementById('root')
)