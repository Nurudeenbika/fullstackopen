import { useEffect, useState } from 'react'
import Filter from './Components/Filter'
import PersonForm from './Components/PersonForm'
import Persons from './Components/Persons'
import contactService from './services/contacts'
import Notification from './Components/Notification'
const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchQuery, setSeachQuery] = useState('')
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    contactService
      .getAll()
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const addName = (event) => {
    event.preventDefault()
    const existingPerson = persons.find(person => person.name === newName)

    if (existingPerson) {

      const confirmUpdate = window.confirm(`${newName} is already added to phonebook, replace the phone number with a new one?`)
      if (confirmUpdate) {
        const updatePerson = { ...existingPerson, number: newNumber}
        contactService
          .update(existingPerson.id, updatePerson)
          .then(returnedPerson => {
            setPersons(persons.map(p => (p.id === existingPerson.id ? returnedPerson : p)))
            setNewName('')
            setNewNumber('')
            setNotification({error: false, text: `${newName} 's phone number was updated.`})
            setTimeout(() => {
              setNotification(null)
            }, 5000)
          })
          .catch((error) => {
            setNotification({ error: true, text: `text: ${newName} 's phone number has already been deleted from server.`})
            setTimeout(() => {
              setNotification(null)
            }, 5000)
          })
      }
    } else {
    const personObject = {
      name: newName,
      number: newNumber
    }

    contactService
      .create(personObject)
      .then(response => {
        setPersons(persons.concat(response.data))
        setNewName('')
        setNewNumber('')
        setNotification({error: false, text: `${newName} was added to the phonebook.`})
        setTimeout(() => {
          setNotification(null)
        }, 5000)
      })
      .catch(error => {
        setNotification({error: true, text: `${error.response.data.error}`})
        setTimeout(() => {
          setNotification(null)
        }, 5000)
      })
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

  
  const deletePerson = id => {
    const person = persons.find(p => p.id === id)
    const confirmDelete = window.confirm(`Delete ${person.name} ?`)

    if (confirmDelete) {
      contactService
        .remove(id)
        .then(returnedPerson => {
          persons.map(person => person.id !== id ? person : returnedPerson)
        })
        setPersons(persons.filter(person => person.id !== id))
        setNotification({ error: false, text: `${person.name} was deleted from the phonebook`,
         
        })
        setTimeout(() => {
          setNotification(null)
        }, 5000)
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification notification={notification} />
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
      
      <Persons 
        persons={filteredPersons}
        deletePerson={deletePerson}
      />
    </div>
  )
}

export default App