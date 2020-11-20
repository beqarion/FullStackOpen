import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = ({anecdotes}) => {
  const arrOfZeroes = new Array(anecdotes.length+1).join('0').split('').map(parseFloat)
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(arrOfZeroes)

  const nextAnecdote = ()=> setSelected(Math.floor(Math.random()*anecdotes.length));
  const updatePoints = () => {
    const votes = [...points]
    votes[selected]++
    setPoints(votes)
  }
  return (
    <div>
      {anecdotes[selected]}
      <div>has {points[selected]} votes</div>
      <div>
        <Btn handler={updatePoints} text="vote" />
        <Btn handler={nextAnecdote} text="next anecdote"/>
      </div>
      
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

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)