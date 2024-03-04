import {gql} from '@apollo/client'

export const AUTHENTICATE = gql`
    query {
        authenticate {
            _id
            username
        }
    }
`
export const GET_USER_NOTES = gql`
query getUserEntries {
  getUserEntries {
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
}`