import { gql } from '@apollo/client'

export const GENERATE_PROMPT = gql`
  mutation Mutation($type: String!) {
    generatePrompt(type: $type) {
    _id
    cream
    createdAt
    text
    updatedAt
    usageCount
  }
}
`

export const REGISTER_USER = gql`
  mutation RegisterUser($username: String!, $email: String!, $password: String!) {
    registerUser(username: $username, email: $email, password: $password) {
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

export const LOGOUT_USER = gql`
  mutation LogoutUser {
    logoutUser {
      message
    }
  }
`

export const NEW_ENTRY = gql`
  mutation newEntry($text: String!, $moodRanking: Int!, $promptId: String, $editorState: String!) {
    newEntry(text: $text, moodRanking: $moodRanking, prompt_id: $promptId, editorState: $editorState) {
      _id
      prompt {
        _id
        text
        cream
        usageCount
        createdAt
        updatedAt
      }
      moodRanking
      cream
      text
      user {
        _id
        username
        email
      }
      createdAt
      updatedAt
      editorState
    }
  }
`

export const DELETE_ENTRY = gql`
  mutation deleteEntry($journalId: String!) {
    deleteEntry(journal_id: $journalId) {
      message
    }
  }
`