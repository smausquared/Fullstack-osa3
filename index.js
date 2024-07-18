const express = require('express')
const cors = require('cors')
var morgan = require('morgan')
const app = express()

app.use(cors())

app.use(express.json()) // luin materiaalista että tämä rivi on oltava, menin tehtäviin,
// tehtävää tehdessäni unohdin lisätä rivin, debuggasin 20 minuuttia googlen ja materiaalin itse koodin 
// avulla kunnes **LUIN** materiaalin uudestaan :D nyt toimii
// uusi testi kommentti wauwauwau jipii
app.use(express.static('dist'))

morgan.token('body', req => {
    return JSON.stringify(req.body)
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

let persons = [
    {
        name: "Arto Hellas",
        number: "040-123456",
        id: "1"
    },
    {
        name: "Ada Lovelace",
        number: "39-44-5323523",
        id: "2"
    },
    {
        name: "Dan Abramov",
        number: "12-43-234345",
        id: "3"
    },
    {
        name: "Mary Poppendieck",
        number: "39-23-6423122",
        id: "4"
    }
]

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/info', (request, response) => {
    response.send(`<p>Phonebook has info for ${persons.length} people</p>
    ${Date().toString()}`)
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

app.post('/api/persons', (request, response) => {
    const body = request.body
    if (!body.name || !body.number) {
        return response.status(400).json({
            error: 'No name or number'
        })
    } else if (persons.map(p => p.name).indexOf(body.name) > -1) {
        return response.status(400).json({
            error: 'Name already added'
        })
    } 

    const person = {
        name: body.name,
        number: body.number,
        id: Math.floor(Math.random() * 10000000).toString()
    }

    persons = persons.concat(person)
    response.json(person)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () =>{
    console.log(`Päälle meni, portti ${PORT}`)
})
