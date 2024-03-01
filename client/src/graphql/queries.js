import {gql} from '@apollo/client'

export const AUTHENTICATE = gql`
    query {
        authenticate {
            _id
            username
        }
    }
`