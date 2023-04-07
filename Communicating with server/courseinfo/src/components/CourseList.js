const Header = ({ course }) => <h2>{course}</h2>

const Total = ({ parts }) => {
  const sum = parts.reduce((a, b) => a + b.exercises, 0)
  console.log(sum)
  return <p><strong>total of {sum} exercises</strong></p>
}
const Part = ({ part }) =>
  <p>
    {part.name} {part.exercises}
  </p>

const Content = ({ parts }) => parts.map(part =>
  <Part
    key={part.id}
    part={part}
  />)

const Course = (props) => {
  const { course } = props
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>)
}

const CourseList = ({ courses }) => courses.map(x => 
  <Course course={x} key={x.id} />)


export default CourseList;