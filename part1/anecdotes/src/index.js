import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = ({anecdotes}) => {
  const arrOfZeroes = new Array(anecdotes.length+1).join('0').split('').map(parseFloat)
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(arrOfZeroes)
  const topAnecdotes = anecdotes.map( (el,i) => [anecdotes[i], points[i]]).sort( (a,b)=>b[1]-a[1])
  
  const nextAnecdote = ()=> setSelected(Math.floor(Math.random()*anecdotes.length));
  const updatePoints = () => {
    const votes = [...points]
    votes[selected]++
    setPoints(votes)
  }
  return (
    <div>
      <h3>Anecdote of the day</h3>
      {anecdotes[selected]}
      <div>has {points[selected]} votes</div>
      <div>
        <Btn handler={updatePoints} text="vote" />
        <Btn handler={nextAnecdote} text="next anecdote"/>
      </div>
      <h3>Anecdote with most votes</h3>
      <TopAnecdote arr={topAnecdotes}/>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const Btn = ({handler, text}) => <button onClick={handler}>{text}</button>
const TopAnecdote = ({arr}) => {
  if (arr.some( el=>el[1]>0)) {return arr[0][0]}
  return "There wasn't vote made yet"
}
ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)