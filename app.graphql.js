const {ApolloServer, gql} = require('apollo-server')
const {personsGraphQL: persons} = require('./fixtures/persons-data')

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
`

const resolvers = {
  Query: {
    personCount: () => persons.length,
    allPersons: () => persons,
    findPerson: (root, {name}) => persons.find((p) => p.name === name),
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
