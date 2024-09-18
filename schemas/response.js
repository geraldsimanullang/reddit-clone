const responseTypeDefs = `#graphql

  interface Response {
    statusCode: Int!
    message: String
  } 

  type RegisterResponse implements Response {
    statusCode: Int!
    message: String
  }

  type LoginResponse implements Response {
    statusCode: Int!
    message: String
    access_token: String
  }
`;

module.exports = { responseTypeDefs };
