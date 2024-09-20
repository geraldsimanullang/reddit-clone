import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation Login($input: LoginInput) {
  login(input: $input) {
    access_token
  }
}
`

export const GET_POSTS = gql`
  query GetPosts {
  getPosts {
    _id
    authorId
    content
    imgUrl
    tags
    comments {
      content
      username
      createdAt
      updatedAt
    }
    likes {
      username
      createdAt
      updatedAt
    }
    createdAt
    updatedAt
    Author {
      _id
      name
      username
      email
    }
  }
}
`