import React from 'react'

const Header = ({course}) => <h3>{course}</h3>
const Content = ({parts}) => {
  return (
    <>
      {parts.map( p => <Part key={p.id} part={p.name} exercises={p.exercises} />)}
    </>
  )
}
const Part = ({part,exercises}) => <p>{part} {exercises} </p>
const Total = ({parts}) => {
  const total = parts.reduce((tot, part)=>part.exercises+tot,0)
  return <p><b>Number of exercises {total}</b></p>
}
const Course = ({course}) => {
  return(
    <>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </>
  )
}
export default Course