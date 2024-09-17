const users = [
  {
    id: 1,
    name: "Gerald Simanullang",
    username: "geraldsimanullang",
    password: "terserah",
    email: "gerald@hacktiv8.com",
  },
  {
    id: 2,
    name: "Shan Benediktus",
    username: "shanbenediktus",
    password: "terserah juga",
    email: "shan@hacktiv8.com",
  },
];

const userTypeDefs = `#graphql
  type User {
    id: ID!
    name: String
    username: String!
    email: String!
    password: String!
  }

  input RegisterInput {
    name: String
    username: String!
    email: String!
    password: String!
  }

  input LoginInput {

  }

  type Mutation {
    Register(input: RegisterInput): RegisterResponse
    Login(input: LoginInput): LoginResponse
  }


`;

const userResolvers = {
  Query: {},
};

module.exports = { userTypeDefs, userResolvers };