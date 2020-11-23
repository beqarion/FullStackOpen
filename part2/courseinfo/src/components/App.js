import React from 'react'
import Course from './Course'

const App = ({courses}) => {
  
    return (
      <>
        <h1>Web development curriculum</h1>
        {courses.map( c => <Course course={c} key={c.id} />)}
      </>
    )
  }

export default App