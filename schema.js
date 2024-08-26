const { gql } = require('apollo-server-express');

const typeDefs = gql`
  # Define a User type
  type User {
    id: ID!
    name: String!
    email: String!
    posts: [Post!]!
  }

  # Define a Post type
  type Post {
    id: ID!
    title: String!
    content: String!
    author: User!
  }

  # Define a Query type
  type Query {
    # Get all users
    users: [User!]!

    # Get a user by ID
    user(id: ID!): User

    # Get all posts
    posts: [Post!]!

    # Get a post by ID
    post(id: ID!): Post
  }

  # Define a Mutation type
  type Mutation {
    # Create a new user
    createUser(name: String!, email: String!): User!

    # Create a new post
    createPost(title: String!, content: String!, authorId: ID!): Post!
  }
`;

const resolvers = {
  Query: {
    users: () => [
      { id: 1, name: 'John Doe', email: 'john@example.com' },
      { id: 2, name: 'Jane Doe', email: 'jane@example.com' },
    ],
    user: (parent, { id }) => {
      const users = [
        { id: 1, name: 'John Doe', email: 'john@example.com' },
        { id: 2, name: 'Jane Doe', email: 'jane@example.com' },
      ];
      return users.find((user) => user.id === id);
    },
    posts: () => [
      { id: 1, title: 'Post 1', content: 'This is post 1', authorId: 1 },
      { id: 2, title: 'Post 2', content: 'This is post 2', authorId: 1 },
      { id: 3, title: 'Post 3', content: 'This is post 3', authorId: 2 },
    ],
    post: (parent, { id }) => {
      const posts = [
        { id: 1, title: 'Post 1', content: 'This is post 1', authorId: 1 },
        { id: 2, title: 'Post 2', content: 'This is post 2', authorId: 1 },
        { id: 3, title: 'Post 3', content: 'This is post 3', authorId: 2 },
      ];
      return posts.find((post) => post.id === id);
    },
  },
  Mutation: {
    createUser: (parent, { name, email }) => {
      const newUser = { id: 3, name, email };
      return newUser;
    },
    createPost: (parent, { title, content, authorId }) => {
      const newPost = { id: 4, title, content, authorId };
      return newPost;
    },
  },
  User: {
    posts: (parent) => {
      const posts = [
        { id: 1, title: 'Post 1', content: 'This is post 1', authorId: 1 },
        { id: 2, title: 'Post 2', content: 'This is post 2', authorId: 1 },
        { id: 3, title: 'Post 3', content: 'This is post 3', authorId: 2 },
      ];
      return posts.filter((post) => post.authorId === parent.id);
    },
  },
  Post: {
    author: (parent) => {
      const users = [
        { id: 1, name: 'John Doe', email: 'john@example.com' },
        { id: 2, name: 'Jane Doe', email: 'jane@example.com' },
      ];
      return users.find((user) => user.id === parent.authorId);
    },
  },
};

module.exports = { typeDefs, resolvers };