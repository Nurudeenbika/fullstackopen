require('dotenv').config()
const express = require('express');
const app = express();
var morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')

app.use(express.json())
morgan('tiny')
app.use(cors())
app.use(express.static('dist'))

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

const mongoose = require('mongoose')

const password = process.argv[2]

const url = process.env.MONGODB_URI;

mongoose.set('strictQuery',false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})




morgan.token('body', (req, res) => JSON.stringify(req.body))

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))


const generateId = () => {
  const maxId = persons.length > 0
    ? Math.random(...persons.map(p => Number(p.id)))
    : 0
  return String(maxId + 7)
}

app.post('/api/persons', (request, response) => {
  body = request.body

 
  if (!body.name || !body.number === undefined) {
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
  const person = new Person({
    name: body.name,
    number: String(body.number)
  })
  person.save().then(savePerson => {
    response.json(savePerson)
  })
})

app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
})

app.get('/api/persons/:id', (request, response) => {
  Person.findById(request.params.id).then(person => {
    response.json(person)
  })
})

app.delete('/api/persons/:id', (request, response) => {
  const id = request.params.id
  persons = persons.filter(person => person.id !== id)

  response.status(204).end()

})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

app.get('/', (request, response) => {
  response.send('<h1>Hello world!</h1>')
})

app.get('/info', (request, response) => {
  const currentDate = new Date()
  response.send(`Phonebook has info for 2 people <p> ${currentDate}</p>`)
})

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
