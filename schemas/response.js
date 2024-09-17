const responseTypeDefs = `#graphql

  interface Response {
    statusCode: Int!
    message: String
    error: String
  } 

  type RegisterResponse implements Response {
    statusCode: Int!
    message: String
    error: String
  }

  type LoginResponse implements Response {
    statusCode: Int!
    message: String
    error: String
    access_token: String
  }
`;

module.exports = { responseTypeDefs };
