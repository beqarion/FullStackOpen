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
  if (good === 0 && neutral === 0 && bad ===0){
    return (
      <>
        <h1>statistics</h1>
        <p>There's no feedback yet</p>
      </>
    )
  }
  return (
    <>
      <h1>statistics</h1>
      <Statistic text='good' value={good}/> <br/>
      <Statistic text='neutral'value={neutral}/> <br/>
      <Statistic text='bad' value={bad}/> <br/>
      <Statistic text='all' value={sum}/> <br/>
      <Statistic text='average' value={(good - bad)/(sum)}/> <br/>
      <Statistic text='positive' value={good/sum*100+"%"} />
    </>
  )
}
const Statistic = ({text,value}) => `${text} ${value}`;
ReactDOM.render(<App />, 
  document.getElementById('root')
)