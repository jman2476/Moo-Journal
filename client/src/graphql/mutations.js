import {gql} from '@apollo/client'

export const GENERATE_PROMPT = gql`
    mutation GeneratePrompt($type: String!){
        generatePrompt(type: $type) {
            text
        }
    }

`

