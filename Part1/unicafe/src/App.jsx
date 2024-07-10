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
    </div>
  )
}

export default App