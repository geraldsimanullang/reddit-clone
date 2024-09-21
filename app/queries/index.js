import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation Login($input: LoginInput) {
    login(input: $input) {
      access_token
    }
  }
`;

export const REGISTER = gql`
  mutation Register($input: RegisterInput) {
    register(input: $input)
  }
`;

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
`;

export const ADD_POST = gql`
  mutation AddPost($input: AddPostInput) {
    addPost(input: $input) {
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
`;
