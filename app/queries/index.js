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

export const GET_POST_BY_ID = gql`
  query GetPostById($input: GetPostByIdInput) {
    getPostById(input: $input) {
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

export const SEARCH_USERS = gql`
  query SearchUsers($input: SearchUserInput) {
    searchUsers(input: $input) {
      _id
      name
      username
      email
    }
  }
`;
