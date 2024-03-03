import {gql} from '@apollo/client'

export const AUTHENTICATE = gql`
    query {
        authenticate {
            _id
            username
        }
    }
`
export const GET_USER_NOTES = gql``