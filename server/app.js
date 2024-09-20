if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const { GraphQLError } = require("graphql");

const { userTypeDefs, userResolvers } = require("./schemas/user-schema");
const { postTypeDefs, postResolvers } = require("./schemas/post-schema");
const { followTypeDefs, followResolvers } = require("./schemas/follow-schema");

const { connect, getDB } = require("./config/mongodb-connection");

const server = new ApolloServer({
  typeDefs: [userTypeDefs, postTypeDefs, followTypeDefs],
  resolvers: [userResolvers, postResolvers, followResolvers],
  introspection: true,
});

(async () => {
  await connect();
  const db = await getDB();

  const { url } = await startStandaloneServer(server, {
    listen: process.env.APOLLO_PORT,

    context: async ({ req, res }) => {
      return {
        authenticate: async () => {
          try {
            const { authorization } = req.headers;

            if (!authorization) {
              throw new GraphQLError("Unauthenticated");
            }

            const access_token = authorization.split(" ")[1]

            if (!access_token) {
              throw new GraphQLError("Invalid Token")
            }

            const { verifyToken } = require("./helpers/jsonwebtoken");
            const payload = verifyToken(access_token);

            const { ObjectId } = require("mongodb");
            const _id = new ObjectId(payload.userId);

            const user = await db.collection("Users").findOne({_id})

            if (!user) {
              throw new GraphQLError("Unauthenticated")
            }

            return {
              userId: user["_id"],
              name: user.name,
              username: user.username,
              email: user.email
            }

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
