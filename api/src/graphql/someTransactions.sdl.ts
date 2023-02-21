export const schema = gql`
  type SomeTransaction {
    id: Int!
    owner: String!
    lastProcessedAt: DateTime
  }

  type Query {
    someTransactions: [SomeTransaction!]! @requireAuth
    someTransaction(id: Int!): SomeTransaction @requireAuth
  }

  input CreateSomeTransactionInput {
    owner: String!
    lastProcessedAt: DateTime
    isNotifyNow: Boolean
  }

  input UpdateSomeTransactionInput {
    owner: String
    lastProcessedAt: DateTime
  }

  type Mutation {
    createSomeTransaction(input: CreateSomeTransactionInput!): SomeTransaction!
      @requireAuth
    updateSomeTransaction(
      id: Int!
      input: UpdateSomeTransactionInput!
    ): SomeTransaction! @requireAuth
    deleteSomeTransaction(id: Int!): SomeTransaction! @requireAuth
    processSomeTransaction(id: Int!): SomeTransaction! @requireAuth
  }
`
