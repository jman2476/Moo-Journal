// This will be the equivalent of the user's dashboard
import { GET_USER_NOTES } from '../graphql/queries'
import { useQuery } from '@apollo/client'



function MyMooJournal() {

    const { data: entryData } = useQuery(GET_USER_NOTES)
    // console.log(data)

    return (
        <>
            <h1>MyMooJournal</h1>
            <button onClick={() => console.log(entryData)}>Get notes</button>
            <div className="entry-container overflow-auto">
            {!entryData?.getUserEntries.length && <h2>You have not created any Entries.</h2>}
                {entryData?.getUserEntries.map((entry, index) => (
                    <div key={entry._id}>
                        <h3>{entry.text}</h3>
                    </div>
                ))}
            </div>
            
        </>
    )
}

export default MyMooJournal