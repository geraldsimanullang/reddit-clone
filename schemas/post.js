const postTypeDefs = `#graphql

  type Post {
    id: ID!
    content: String
    tags:
    imgUrl:
    authorId:
    comments:
    likes:
    creataedAt:
    updatedAt:
  }

`

const postResolvers = {

}

module.exports = { postTypeDefs, postResolvers }