const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://nurudeenhassan:${password}@cluster0.ri4ry38.mongodb.net/People?retryWrites=true&w=majority&appName=Cluster0`

// const name = process.argv[3]
// const number = process.argv[4]

mongoose.set('strictQuery', false)

mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String
})

const Person = mongoose.model('Person', personSchema)

// const person = new Person({
//   name: process.argv[3],
//   number: process.argv[4],
// })

// person.save().then(() => {
//   console.log(`added ${name} number ${number} to phonebook`)
//   mongoose.connection.close()
// })

Person.find({}).then(result => {
  result.forEach(persons => {
    console.log(persons)
  })
  mongoose.connection.close()
})