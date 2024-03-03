// This will be the equivalent of the user's dashboard
import {GET_USER_NOTES} from '../graphql/mutations'
import { useQuery, useMutation } from '@apollo/client'



function MyMooJournal(){

    const data = useQuery(GET_USER_NOTES)

    return (
        <>
            <h1>MyMooJournal</h1>
            <button onClick={() => console.log('notes')}>Get notes</button>
        </>
    )
}

export default MyMooJournal