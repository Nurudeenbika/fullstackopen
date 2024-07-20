const Header2 = ({ heading }) => <h2>{heading}</h2>

const Content = ({ course }) => 
        <div>
            <ul>
                {course.map(({ name, exercises, id }) => (
                    <Part key={id} name={name} exercises={exercises} />
                ))}
            </ul>
        </div>
    


const Part = ({ name, exercises}) => <li>{name} {exercises}</li>
    
const TotalExercises = ({ exercises }) => {
    const total = exercises.reduce((total_exercises, part) => total_exercises + part.exercises, 0)
    return (
        <div>
        <ul>
            <strong>total of {total} exercises</strong>
        </ul>
        </div>
       
    )
}

const Course = ({ course }) => 
        <div>
            <Header2 key={course.id} heading={course.name} />
            <Content course={course.parts} />
            <TotalExercises exercises={course.parts} />
        </div>
    


export default Course