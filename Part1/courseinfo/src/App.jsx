const App = () => {
  const course = 'Half Stack application development'
   const part = [
     {
       name: 'Fundamentals of React',
       exercises: 10
     },
     {
       name: 'Using props to pass data',
       exercises: 7
     },
     {
       name: 'State of a component',
       exercises: 14
     },
   ]  
  return (
   <div>
     <h1>{course}</h1>
     <p>{part[0].name} {part[0].exercises}</p>
     <p>{part[1].name} {part[1].exercises}</p>
     <p>{part[2].name} {part[2].exercises}</p>
    <p>Number of exercises {part[0].exercises + part[1].exercises + part[2].exercises}</p>
   </div>
  )
 }
 
 export default App