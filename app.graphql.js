const {ApolloServer, gql} = require('apollo-server')
let {personsGraphQL: persons} = require('./fixtures/persons-data')
const {v1: uuid} = require('uuid')

const typeDefs = gql`
  type Address {
    street: String!
    city: String!
  }

  type Person {
    name: String!
    phone: String
    address: Address!
    id: ID!
  }

  type Query {
    personCount: Int!
    allPersons: [Person!]!
    findPerson(name: String!): Person
  }

  type Mutation {
    addPerson(
      name: String!
      phone: String
      street: String!
      city: String!
    ): Person
  }
`

const resolvers = {
  Query: {
    personCount: () => persons.length,
    allPersons: () => persons,
    findPerson: (root, {name}) => persons.find((p) => p.name === name),
  },
  Mutation: {
    addPerson: (root, args) => {
      let person = {...args, id: uuid()}
      persons = persons.concat(person)
      return person
    },
  },
  Person: {
    id: ({_id, id}) => _id ?? id,
    address: ({street, city}) => {
      return {street, city}
    },
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({url}) => {
  console.log(`Server ready at ${url}`)
})
