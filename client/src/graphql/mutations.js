const {gql} = require('@apollo/client')


export const REGISTER_USER = gql`
  mutation RegisterUser($username: String!, $email: String!, $password: String!) {
    registerUser(username: $username, email: $email, password: $password) {
      _id
      email
      username
    }
  }
`



// export const GENERATE_PROMPT = gql`
//   mutation GeneratePrompt($cream: String!) {
//         generatePrompt {
//             _id
//             prompt
//         }
//     }
// `