import { gql } from "@apollo/client";

const CREATE_USER_MUTATION = gql`
  mutation CreateUser($user: UserInput!) {
    createUser(user: $user) {
      _id
      email
      firstName
      lastName
      username
    }
  }
`;

const LOG_IN_MUTATION = gql`
  mutation LogIn($email: String!, $pin: Int!) {
    login(email: $email, pin: $pin) {
      token
      email
    }
  }
`;

export { CREATE_USER_MUTATION, LOG_IN_MUTATION };
