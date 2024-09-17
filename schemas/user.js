const { hashPassword } = require("../helpers/bcryptjs");
const { GraphQLError } = require("graphql");

const userTypeDefs = `#graphql
  type User {
    _id: ID!
    name: String
    username: String!
    email: String!
  }

  input RegisterInput {
    name: String
    username: String!
    email: String!
    password: String!
  }

  type Query {
    users: [User]
  }

  type Mutation {
    register(input: RegisterInput): RegisterResponse
  }
`;

const userResolvers = {
  Query: {
    users: async (_, __, context) => {
      try {
        const { db } = context;
        const users = await db.collection("Users").find({}).toArray();
        return users;
      } catch (error) {
        console.log(error);
      }
    },
  },

  Mutation: {
    register: async (_, args, context) => {
      try {
        const { db } = context;
        const { name, username, email, password } = args.input;

        // Unique username validation
        const findUserByUsername = await db
          .collection("Users")
          .findOne({ username });

        if (findUserByUsername) {
          throw new GraphQLError("Username has already been taken", {
            extensions: {
              statusCode: 400,
            },
          });
        }

        // Unique email validation
        const findUserByEmail = await db
          .collection("Users")
          .findOne({ email });

        if (findUserByEmail) {
          throw new GraphQLError("Email has already been taken", {
            extensions: {
              statusCode: 400,
            },
          });
        }

        // Email format validation
        const validateEmailFormat = (email) => {
          const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          return re.test(String(email).toLowerCase());
        }

        if (!validateEmailFormat(email)) {
          throw new GraphQLError("Invalid email format", {
            extensions: {
              statusCode: 400
            }
          })
        }

        // Password length validation
        if (password.length < 5) {
          throw new GraphQLError("Password must at least has 5 characters", {
            extensions: {
              statusCode: 400
            }
          })
        }

        // Passed all validation
        const registerInput = {
          name,
          username,
          email,
          password: hashPassword(password),
        };

        await db.collection("Users").insertOne(registerInput);

        return {
          statusCode: 201,
          message: "Register success",
        };
      } catch (error) {
        return {
          statusCode: error.extensions.statusCode,
          message: error.message,
        };
      }
    },
  },
};

module.exports = { userTypeDefs, userResolvers };
