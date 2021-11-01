const {ApolloServer, gql, UserInputError} = require('apollo-server')
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
    allPersons(phone: YesNo): [Person!]!
    findPerson(name: String!): Person
  }

  type Mutation {
    addPerson(
      name: String!
      phone: String
      street: String!
      city: String!
    ): Person

    editNumber(name: String!, phone: String!): Person
  }

  enum YesNo {
    YES
    NO
  }
`

const resolvers = {
  Query: {
    personCount: () => persons.length,
    allPersons: (root, args) => {
      if (!args.phone) {
        return persons
      }

      const byPhone = (person) =>
        args.phone === 'YES' ? person.phone : !person.phone
      return persons.filter(byPhone)
    },
    findPerson: (root, {name}) => persons.find((p) => p.name === name),
  },
  Mutation: {
    addPerson: (root, args) => {
      const foundPersonName = persons.find(
        (p) => p.name.toLowerCase() === args.name.toLowerCase(),
      )
      if (foundPersonName) {
        throw new UserInputError('Name must be unique', {
          invalidArgs: args.name,
        })
      }
      let person = {...args, id: uuid()}
      persons = persons.concat(person)
      return person
    },
    editNumber: (root, args) => {
      const person = persons.find(
        (p) => p.name.toLowerCase() === args.name.toLowerCase(),
      )

      if (!person) {
        return null
      }

      const updatedPerson = {...person, phone: args.phone}
      persons = persons.map((p) => (p.name === args.name ? updatedPerson : p))
      return updatedPerson
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
