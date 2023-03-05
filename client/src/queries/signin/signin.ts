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

export { CREATE_USER_MUTATION };
