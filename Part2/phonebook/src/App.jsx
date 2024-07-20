import { useState } from 'react'
import Phonebook from './Components/Phonebook'


const App = () => {
  const [persons, setPerson] = useState([
    { name: 'Arto Hellas' }
  ])
  const [newName, setNewName] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)

  const addName = (event) => {
    event.preventDefault()
    const existingName = persons.find(person => person.name === newName)

    if (existingName) {
      setErrorMessage(window.alert(`${newName} is already added to phonebook`))
    } else {
    const personObject = {
      name: newName,
      id: persons.length + 1
    }
    setPerson(persons.concat(personObject))
    setNewName('')
    setErrorMessage(null)
   }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input 
          value={newName}
          onChange={handleNameChange} 
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      
      <h2>Numbers</h2>
      <div>
        {persons.map(person => 
          <Phonebook key={person.name} person={person} />
        )}
      </div>
      <p>{errorMessage}</p> 
    </div>
  )
}

export default App