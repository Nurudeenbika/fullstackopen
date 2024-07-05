const Header = ({ course }) => {
  
  return (
    <div>
     <h1>{course}</h1>
    </div>
  ) 
}

const Part = ({part1, exercises1, part2, exercises2, part3, exercises3 }) => {
  return (
    <div>
      <p>
        {part1} {exercises1}
      </p>
      <p>
        {part2} {exercises2}
      </p>
      <p>
        {part3} {exercises3}
      </p>
    </div>
  )
}

const Content = ({ part1, exercises1, part2, exercises2, part3, exercises3 }) => {
  part1 = 'Fundamentals of React'
  exercises1 = 10
  part2 = 'Using props to pass data'
  exercises2 = 7
  part3 = 'State of a component'
  exercises3 = 14

  return (
    <div>
     <Part part1={part1} exercises1={exercises1} />
     <Part part2={part2} exercises2={exercises2} />
     <Part part3={part3} exercises3={exercises3} />
    </div>
  )
}

const Total = ({exercises1=10, exercises2=7, exercises3=14}) => {
  return (
    <div>
      <p>Number of exercises {exercises1 + exercises2 + exercises3}</p>
    </div>
  )
}

const App = () => {
 const course = 'Half Stack application development'
 
 return (
  <div>
    <Header course={course} />
    <Content />
    <Total /> 
  </div>
 )
}

export default App