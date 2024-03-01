import {gql} from '@apollo/client'

export const GENERATE_PROMPT = gql`
    mutation GeneratePrompt($type: String!){
        generatePrompt(type: $type) {
            text
        }
    }

`
export const SIGNUP_USER = gql`
  mutation SignUpUser($username: String!, $email: String!, $password: String!) {
    signUpUser(username: $username, email: $email, password: $password) {
      _id
      email
      username
    }
  }
`

export const LOGIN_USER = gql`
  mutation LoginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      _id
      email
      username
    }
  }
`
export const CREATE_LIGHTENTRY = gql`
  mutation CreateLightEntry($text: String!) {
    CreateLightEntry(text: $text) {
      _id
      text
    }
  }
`
export const CREATE_HEAVYENTRY = gql`
  mutation CreateHeavyEntry($text: String!) {
    createHeavyEntry(text: $text) {
      _id
      text
    }
  }
`

export const LOGOUT_USER = gql`
  mutation LogoutUser {
    logoutUser {
      message
    }
  }
`

// export const EDIT_ENTRY = gql`
//   mutation EditEntry($text: String!, $entry_id: ID) {
//     editEntry(text: $text, entry_id: $entry_id) {
//       message
//     }
//   }
// `
export const DELETE_LIGHTENTRY = gql`
  mutation DeleteLightEntry($entry_id: ID) {
    DeleteLightEntry(entry_id: $entry_id) {
      message
    }
  }
`
export const DELETE_HEAVYENTRY = gql`
  mutation DeleteHeavyEntry($entry_id: ID) {
    DeleteHeavyEntry(entry_id: $entry_id) {
      message
    }
  }
`
