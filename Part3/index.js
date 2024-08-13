const express = require('express');
const app = express();
var morgan = require('morgan')

app.use(express.json())
morgan('tiny')

let persons = [
  { 
    "id": "1",
    "name": "Arto Hellas", 
    "number": "040-123456"
  },
  { 
    "id": "2",
    "name": "Ada Lovelace", 
    "number": "39-44-5323523"
  },
  { 
    "id": "3",
    "name": "Dan Abramov", 
    "number": "12-43-234345"
  },
  { 
    "id": "4",
    "name": "Mary Poppendieck", 
    "number": "39-23-6423122"
  }
]

const generateId = () => {
  const maxId = persons.length > 0
    ? Math.random(...persons.map(p => Number(p.id)))
    : 0
  return String(maxId + 7)
}

app.post('/api/persons', (request, response) => {
  body = request.body

 

  if (!body.name || !body.number) {
    return response.status(400).json({
      error: 'name or number missing'
    })
  } 

  const nameExists = persons.find(person => person.name === body.name )
  if (nameExists) {
    return response.status(400).json({
      error: 'name must be unique'
    })
  } 
  const person = {
    id: generateId(),
    name: body.name,
    number: String(body.number)
   
  }

  persons = persons.concat(person)

  response.json(person)
})

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
  const id = request.params.id
  const person = persons.find(person => person.id === id)
  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})

app.delete('/api/persons/:id', (request, response) => {
  const id = request.params.id
  persons = persons.filter(person => person.id !== id)

  response.status(204).end()

})

app.get('/info', (request, response) => {
  const currentDate = new Date()
  response.send(`Phonebook has info for 2 people <p> ${currentDate}</p>`)
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
