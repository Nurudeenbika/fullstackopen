
import './App.css'

interface HeaderProps {
  name: string;
}

interface CoursePart{
  name: string;
  exerciseCount: number;
}

interface ContentProps {
  parts: CoursePart[];
}

interface TotalProps {
  total: number;
}

const Header = (props: HeaderProps) => {

  return (
    <>
    <h1>{props.name}</h1>
    </>
  )
}

const Content = ({ parts }: ContentProps) => {
  return (
    <div>
      {parts.map((parts, index) => (
        <p key={index}>
          {parts.name} {parts.exerciseCount}
        </p>
      ))}
    </div>
  )
}

const Total = ({ total }: TotalProps) => {
  return (
    <>
    <p>Number of exercises {total}</p>
    </>
  )
}

const App = () => {
  const courseName = "Half stack application development";
  const courseParts = [
    {
      name: "Fundamentals",
      exerciseCount: 10
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14
    }
  ];

  const totalExercises = courseParts.reduce((sum, part) => sum + part.exerciseCount, 0);

  return (
    <div>
      <Header name={courseName}  />
      <Content parts={courseParts} />
      <Total total={totalExercises} /> 
    </div>
    
  )
}

export default App
