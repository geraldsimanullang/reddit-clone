const followTypeDefs = `#graphql
  type Follow {
      _id: ID
      followingId: 
      followerId:
      createdAt:
      updatedAt:
  }
`;

const followResolvers = {};

module.exports = { followTypeDefs, followResolvers };
