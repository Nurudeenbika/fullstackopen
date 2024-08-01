import { useEffect, useState } from 'react'
import Person from './Components/Person'
import Filter from './Components/Filter'
import PersonForm from './Components/PersonForm'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchQuery, setSeachQuery] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    axios
    .get('http://localhost:3001/persons')
    .then(response => {
      console.log('promised fulfilled')
      setPersons(response.data)
    })
  }, [])

  const addName = (event) => {
    event.preventDefault()
    const existingName = persons.find(person => person.name === newName)

    if (existingName) {
      setErrorMessage(window.alert(`${newName} is already added to phonebook`))
    } else {
    const personObject = {
      name: newName,
      number: newNumber
      //id: persons.length + 1
    }

    axios
      .post('http://localhost:3001/persons', personObject)
      .then(response => response.data)
    setPersons(persons.concat(personObject))
    setNewName('')
    setNewNumber('')
    setErrorMessage(null)
   }
  }

  const filteredPersons = searchQuery === '' 
    ? persons
    : persons.filter(person => 
    person.name.toLowerCase().includes(searchQuery.toLowerCase()))
  

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearchChange = (event) => {
    setSeachQuery(event.target.value)
  }

  const Persons = ({persons}) => {
    return (
      <div>
        {persons.map(person => (
          <Person key={person.name} person={person} />
        ))}
         <p>{errorMessage}</p> 
      </div>
    )
  }

  return (
    <div>
      <h2>Phonebook</h2>
    
      <Filter searchQuery={searchQuery} handleSearchChange={handleSearchChange} />
  
      <h3>add a new</h3>

      <PersonForm
        addName={addName} 
        newName={newName} 
        handleNameChange={handleNameChange} 
        newNumber={newNumber} 
        handleNumberChange={handleNumberChange}
      />
      
      <h3>Numbers</h3>
      
      <Persons persons={filteredPersons} />
    </div>
  )
}

export default App