
import './App.css'

interface HeaderProps {
  name: string;
}

interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface DescribableCoursePart extends CoursePartBase {
  description: string;
}

interface CoursePartBasic extends DescribableCoursePart {
  kind: "basic";
}

interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: "group";
}

interface CoursePartBackground extends DescribableCoursePart {
  backgroundMaterial: string;
  kind: "background"
}

interface CoursePartSpecial extends DescribableCoursePart {
  requirements: string[];
  kind: "special"
}

type CoursePart = | CoursePartBasic | CoursePartGroup | CoursePartBackground | CoursePartSpecial;

interface TotalProps {
  total: number;
}

interface CourseProps {
  parts: CoursePart[]
}


const Header = (props: HeaderProps) => {

  return (
    <>
    <h1>{props.name}</h1>
    </>
  )
}

const Part = ({ part }: { part: CoursePart }) => {
  switch (part.kind) {
    case "basic":
    case "background":  
      return (
        <div>
          <h3>{part.name}</h3>
          <p>Exercises: {part.exerciseCount}</p>
          <p>Description: {part.description}</p>
          { part.kind === "background" && (
            <p>Background Materials: { part.backgroundMaterial }</p>
          ) }
        </div>
      );
    case "group":
      return (
        <div>
          <h3>{part.name}</h3>
          <p>Exercises: {part.exerciseCount}</p>
          <p>Group Project Count: {part.groupProjectCount}</p>
        </div>
      );
    case "special":
      return (
        <div>
          <h3>{part.name}</h3>
          <p>Exercises: {part.exerciseCount}</p>
          <p>Description: {part.description}</p>
          <p>Requirements: {part.requirements.join(", ")}</p>
        </div>
      );
    default:
      { const _exhaustiveCheck: never = part;
      return _exhaustiveCheck; }   
  }
}

const Content = ({ parts }: CourseProps) => {
  return (
    <div>
      {parts.map((part: CoursePart) => (
        <Part key={part.name} part={part} />
      ))}
    </div>
  );
};

const Total = ({ total }: TotalProps) => {
  return (
    <>
    <p>Number of exercises {total}</p>
    </>
  )
}

const App = () => {

  //type CoursePart = CoursePartBasic | CoursePartGroup | CoursePartBackground;
  
  const courseName = "Half stack application development";
  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is an awesome course part",
      kind: "basic"
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3,
      kind: "group"
    },
    {
      name: "Basics of type Narrowing",
      exerciseCount: 7,
      description: "How to go from unknown to string",
      kind: "basic"
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      backgroundMaterial: "https://type-level-typescript.com/template-literal-types",
      kind: "background"
    },
    {
      name: "TypeScript in frontend",
      exerciseCount: 10,
      description: "a hard part",
      kind: "basic",
    },
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
