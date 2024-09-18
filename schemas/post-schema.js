const { ObjectId } = require("mongodb");

const postTypeDefs = `#graphql
  type Comment {
    content: String!
    username: String!
    createdAt: String 
    updatedAt: String
  }

  type Like {
    username: String!
    createdAt: String
    updatedAt: String
  }

  type Post {
    _id: ID!
    authorId: ID!
    content: String!
    imgUrl: String
    tags: [String]
    comments: [Comment]
    likes: [Like]
    creataedAt: String
    updatedAt: String
  }

  input AddPostInput {
    content: String!
    imgUrl: String
    tags: [String]
  }

  type Query {
    getPosts: [Post]
  }

  type Mutation {
    addPost(input: AddPostInput): Post
  }

`;

const postResolvers = {
  Query: {
    getPosts: async (_, __, context) => {
      try {
        const { db } = context;
        const posts = await db.collection("Posts").find({}).toArray();

        return posts;
      } catch (error) {
        throw error;
      }
    },
  },

  Mutation: {
    addPost: async (_, args, context) => {
      try {
        const userInfo = context.authenticate();
        const { db } = context;

        const { content, imgUrl, tags } = args.input;

        const postInput = {
          authorId: new ObjectId(userInfo.userId),
          content,
          imgUrl,
          tags,
          comments: [],
          likes: [],
          createdAt: new Date(),
          updatedAt: new Date(),
        };

        const addPostReport = await db.collection("Posts").insertOne(postInput);
        
        const newPost = await db
          .collection("Posts")
          .findOne({ _id: addPostReport.insertedId });

        return newPost;
      } catch (error) {
        throw error;
      }
    },
  },
};

module.exports = { postTypeDefs, postResolvers };
