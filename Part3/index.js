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

app.post('/api/persons', (request, response) => {
  body = request.body;

 
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
    number: body.number
  })
  person.save().then(savePerson => {
    response.json(savePerson);
  })
})

app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body

  const person = {
    name: body.name,
    number: body.number,
  }

  Person.findByIdAndUpdate(request.params.id, person, { new: true })
    .then(updatedPerson => {
      response.json(updatedPerson);
    })
    .catch(error => next(error));
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons);
  })
})

app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id).then(person => {
    if (person) {
      response.json(person)
    } else {
      response.status(404).end();
    }
  })
  .catch(error => next(error));
})

app.delete('/api/persons/:id', (request, response) => {
  Person.findByIdAndDelete(request.params.id)
    .then(result => {
      response.status(204).end();
    })
    .catch(error => next(error))
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }

  next(error);
}

app.get('/', (request, response) => {
  response.send('<h1>Hello world!</h1>')
})

app.get('/info', (request, response) => {
  const currentDate = new Date()
  response.send(`Phonebook has info for 2 people <p> ${currentDate}</p>`)
})

app.use(unknownEndpoint);
app.use(errorHandler);

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})
