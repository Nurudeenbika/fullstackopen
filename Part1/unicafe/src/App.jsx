import { useState } from "react"

const Button = (props) => 
  <button onClick={props.handleClick}>{props.text}</button>


const App = () => {

  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => setGood(good + 1)
  const handleNeutralClick = () => setNeutral(neutral + 1)
  const handleBadClick = () => setBad(bad + 1)
  
  let totalCount = good + neutral + bad
  let average = (good + neutral + bad) / 3
  let positive = (good / totalCount) * 100
  
  return (
    <div>
      <h1>give feedback</h1>
      
      <Button handleClick={handleGoodClick} text='good' />
      <Button handleClick={handleNeutralClick} text='neutal' />
      <Button handleClick={handleBadClick} text='bad' />
      
      <h1>statistics</h1>
      good {good}
      <br />
      neutral {neutral}
      <br />
      bad {bad}
      <br />
      all {totalCount}
      <br />
      average {average}
      <br />
      positive {positive} %
    </div>
  )
}
export default App