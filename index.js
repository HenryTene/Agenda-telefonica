const express = require("express");
const app = express();
const morgan = require("morgan");
app.use(express.json());

app.use(morgan("dev"));


const persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];
const info = {
  message: `Phonebook has info for ${persons.length} people`,
  date: new Date().toString(),
};

app.get("/api/persons", (req, res) => {
  res.json(persons);
});

app.get("/info", (req, res) => {
  res.json(info);
});

app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  const person = persons.find((person) => person.id === id);
  if (!person) {
    response.status(404).json({ error: `person with id ${id} not found.` });
  }
  return response.json(person);
});

app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  const personsFiltered = persons.filter((person) => person.id !== id);

  return response.json(personsFiltered);
});

const generateId = () => {
  const maxId =
    persons.length > 0
      ? persons.map((person) => person.id).sort()[persons.length - 1]
      : 0;
  return maxId + 1;
};

app.post("/api/persons", (request, response) => {
  const person = request.body;

    if (!person.name || !person.number ) {
        return response.status(400).json({ error: "name or number missing" });
    }if( persons.name===person.name){
        return response.status(400).json({ error: "name must be unique" });
    }
  response.status(201).json({ ...person, id: generateId() });
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`🚀Server running at http://localhost:${PORT} 🚀`);
});
