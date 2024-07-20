const pass = process.argv[2]
const url = `mongodb+srv://smausquared:${pass}@fullstack.9nkefsm.mongodb.net/?retryWrites=true&w=majority&appName=Fullstack`

const mongoose = require('mongoose')

mongoose.set('strictQuery', false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
    name: String,
    number: String
})
const Person = mongoose.model('Person', personSchema)

if (process.argv.length > 3) {
    const name = process.argv[3]
    const number = String(process.argv[4])
    const person = new Person({
        name: name,
        number: number
    })
    
    person.save().then(result => {
        console.log(`added ${person.name} number ${person.number}`)
        mongoose.connection.close()
    })
} else {
    console.log('phonebook:')
    Person.find({}).then(result => {
        result.forEach(person => {
          console.log(person.name, person.number)
        })
        mongoose.connection.close()
      })
}
