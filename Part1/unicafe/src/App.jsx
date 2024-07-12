import { useState } from "react"

const Header = ({ heading}) => <h1>{heading}</h1>

const StatisticLine = ({ text, value }) => {

  return (
    <tr>
      <td>{text}</td> 
      <td>{value}</td>
    </tr>
  )
}

const Statistics = ({ good, neutral, bad}) => {
  let totalCount = good + neutral + bad
  let average = (good - bad) / totalCount
  let positive = (good / totalCount) * 100
  
  if (totalCount === 0) {
    return (
      <>
        No feedback given
      </>
    )
  }

  return (
    <table>
      <tbody>
        <StatisticLine text='good' value={good} />
        <StatisticLine text='neutral' value={neutral} />
        <StatisticLine text='bad' value={bad} />
        <StatisticLine text='all' value={totalCount} />
        <StatisticLine text='average' value={average} />
        <StatisticLine text='positive' value={positive} />
    </tbody>
    </table>
  )
}

const Button = (props) => 
  <button onClick={props.handleClick}>{props.text}</button>

const App = () => {

  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => setGood(good + 1)
  const handleNeutralClick = () => setNeutral(neutral + 1)
  const handleBadClick = () => setBad(bad + 1)
  
  
  return (
    <div>
      <h1>give feedback</h1>
      
      <Button handleClick={handleGoodClick} text='good' />
      <Button handleClick={handleNeutralClick} text='neutal' />
      <Button handleClick={handleBadClick} text='bad' />
      <Header heading='statistics' />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}
export default App