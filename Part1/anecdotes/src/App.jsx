import { useState } from 'react'

const Header = ({ heading }) => <h2>{heading}</h2>

const Button = ({ handleClick, text }) => (<button onClick={handleClick}>
  {text}
  </button>
  )

  const HighestAnecdoteVote = ({ anecdotes, votes }) => {
    const highestVotes = Math.max(...votes)
    const highestVotesindex = votes.indexOf(highestVotes)

    if (highestVotes === 0) {
      return (
        <>
        <p>No vote yet</p>
        </>
      )
    }

    return (
      <VoteCounts text={anecdotes[highestVotesindex]} votes={highestVotes} />
    )
  }

const VoteCounts = ({ text, votes }) => {
  return (
    <>
      <p>{text}</p>
      <p>has {votes} votes</p>
    </>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
  
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))

  const setToSelected = () => {
    const randomint = Math.floor(Math.random() * anecdotes.length)
    setSelected(randomint)
}
  
  const setToVotes = () => {
    const updatedVotes = [...votes]
    updatedVotes[selected] += 1
    setVotes(updatedVotes)
  }

  return (
    <div>
      <VoteCounts text={anecdotes[selected]} votes={votes[selected]} />
      <Button handleClick={setToVotes} text='votes' />
      <Button handleClick={setToSelected} text='next anecdotes' />
      <Header heading='Anecdote with most votes' />
      <HighestAnecdoteVote anecdotes={anecdotes} votes={votes} />
    </div>
  )
}

export default App