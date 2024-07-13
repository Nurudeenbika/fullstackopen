const Header = ({course}) => <h1>{course.name}</h1>

const Part = (props) => {
    return (
        <p>
       {props.part.name} {props.part.exercises}
        </p>
    )
}

const Content = ({course}) => {
    return (
        <div>
            {course.parts.map((part) => <Part part={part} key={part.id} />)}  
        </div>
       
    )
}

const Course = ({course}) => {
    return (
        <div>
            <Header course={course} />
            <Content course={course} />
        </div>
    )
}

export default Course