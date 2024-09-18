if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const { GraphQLError } = require("graphql");

const { responseTypeDefs } = require("./schemas/response");
const { userTypeDefs, userResolvers } = require("./schemas/user");
// const { followTypeDefs, followResolvers } = require("./schemas/follow");
// const { postTypeDefs, postResolvers } = require("./schemas/post");

const { connect, getDB } = require("./config/mongodb-connection");

const server = new ApolloServer({
  typeDefs: [responseTypeDefs, userTypeDefs],
  resolvers: [userResolvers],
});

(async () => {
  await connect();
  const db = await getDB();

  const { url } = await startStandaloneServer(server, {
    listen: 4000,

    context: async ({ req, res }) => {
      return {
        authentication: async () => {
          try {
            const { authorization } = req.headers;

            if (!authorization) {
              throw new GraphQLError("Unauthorized");
            }

            const access_token = authorization.split(" ")[1]

            if (!access_token) {
              throw new GraphQLError("Invalid Token")
            }

            const { verifyToken } = require("./helpers/jsonwebtoken");
            const payload = verifyToken(authorization);

         

          } catch (error) {
            throw error
          }
        },
        db,
      };
    },
  });

  console.log(`🚀 Server ready at ${url}`);
})();
