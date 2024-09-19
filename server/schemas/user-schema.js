const { hashPassword, comparePassword } = require("../helpers/bcryptjs");
const { signToken } = require("../helpers/jsonwebtoken");
const { GraphQLError } = require("graphql");

const userTypeDefs = `#graphql
  type User {
    _id: ID!
    name: String
    username: String!
    email: String!
  }

  input SearchUserInput {
    keyword: String!
  }

  input RegisterInput {
    name: String
    username: String!
    email: String!
    password: String!
  }

  input LoginInput {
    username: String!
    password: String!
  }

  type Query {
    searchUsers(input: SearchUserInput): [User]
  }

  type Mutation {
    register(input: RegisterInput): RegisterResponse
    login(input: LoginInput) : LoginResponse
  }
`;

const userResolvers = {
  Query: {
    searchUsers: async (_, args, context) => {
      try {
        const { db } = context;
        const { keyword } = args.input;
        const query = {
          $or: [
            { name: { $regex: keyword, $options: "i" } },
            { username: { $regex: keyword, $options: "i" } },
          ],
        };

        const users = await db.collection("Users").find(query).toArray();

        return users;
      } catch (error) {
        throw error;
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
              http: { status: 400 },
            },
          });
        }

        // Unique email validation
        const findUserByEmail = await db.collection("Users").findOne({ email });

        if (findUserByEmail) {
          throw new GraphQLError("Email has already been registered", {
            extensions: {
              http: { status: 400 },
            },
          });
        }

        // Email format validation
        const validateEmailFormat = (email) => {
          const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          return re.test(String(email).toLowerCase());
        };

        if (!validateEmailFormat(email)) {
          throw new GraphQLError("Invalid email format", {
            extensions: {
              http: { status: 400 },
            },
          });
        }

        // Password length validation
        if (password.length < 5) {
          throw new GraphQLError("Password must at least has 5 characters", {
            extensions: {
              http: { status: 400 },
            },
          });
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
        throw error
      }
    },

    login: async (_, args, context) => {
      try {
        const { db } = context;
        const { username, password } = args.input;

        const user = await db.collection("Users").findOne({ username });

        if (!user) {
          throw new GraphQLError("Invalid Username or Password", {
            extensions: {
              http: { status: 401 },
            },
          });
        }

        if (!comparePassword(password, user.password)) {
          throw new GraphQLError("Invalid Username or Password", {
            extensions: {
              http: { status: 401 },
            },
          });
        }

        const payload = {
          userId: user["_id"],
          name: user.name,
          username: user.username,
          email: user.email,
        };

        const access_token = signToken(payload);

        return {
          statusCode: 200,
          message: "Login Success",
          access_token,
        };
      } catch (error) {
        throw error;
      }
    },
  },
};

module.exports = { userTypeDefs, userResolvers };
