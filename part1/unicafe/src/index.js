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
      <table>
        <tbody>
        <Statistic text='good' value={good}/>
        <Statistic text='neutral'value={neutral}/>
        <Statistic text='bad' value={bad}/>
        <Statistic text='all' value={sum}/>
        <Statistic text='average' value={(good - bad)/(sum)}/>
        <Statistic text='positive' value={good/sum*100+"%"} />
        </tbody>
      </table>
      
    </>
  )
}
const Statistic = ({text,value}) => <tr><td>{text}</td><td>{value}</td></tr>;
ReactDOM.render(<App />, 
  document.getElementById('root')
)