const { ObjectId } = require("mongodb");

const followTypeDefs = `#graphql
  type Follow {
      _id: ID!
      followingId: ID!
      followerId: ID!
      createdAt: String
      updatedAt: String
  }

  input FollowInput {
    followingId: String
  }

  type Mutation {
    followUser(input: FollowInput): Follow
  }
`;

const followResolvers = {
  Mutation: {
    followUser: async (_, args, context) => {
      try {
        const userInfo = await context.authenticate();
        const { followingId } = args.input;
        const { db } = context;

        const followInput = {
          followingId: new ObjectId(followingId),
          followerId: new ObjectId(userInfo.userId),
          createdAt: new Date(),
          updatedAt: new Date(),
        };

        const followReport = await db
          .collection("Follows")
          .insertOne(followInput);

        const follow = await db
          .collection("Follows")
          .findOne({ _id: new ObjectId(followReport.insertedId) });

        return follow;
        
      } catch (error) {
        throw error;
      }
    },
  },
};

module.exports = { followTypeDefs, followResolvers };
