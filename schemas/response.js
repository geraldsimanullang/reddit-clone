const responseTypeDefs = `#graphql
  interface Response {
    statusCode: Int!
    message: String
  } 

  type RegisterResponse implements Response {
    statusCode: Int!
    message: String
  }
`;

module.exports = { responseTypeDefs };
