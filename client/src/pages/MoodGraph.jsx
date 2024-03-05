import { useState, useEffect } from 'react'
import { GRAPH_MOOD } from '../graphql/queries'
import { useQuery } from '@apollo/client'

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'



function MoodGraph() {

    const { loading, error, data } = useQuery(GRAPH_MOOD)
    const [userData, setUserData] = useState([])

    
    useEffect(() => {
        if (data) {
            let dataOrganizer = []
            console.log(data.graphMood.date)
            console.log(data.graphMood.moodRanking)
            console.log(userData)
            for (let i in data.graphMood.date) {
                dataOrganizer.push({
                    date: data.graphMood.date[i],
                    moodRanking: data.graphMood.moodRanking[i]
                })
            }
            setUserData(dataOrganizer)
        }
    }, [data])
    
    if (loading) return 'Loading...';
    if (error) return `Error! ${error.message}`;
    console.log(userData)

    return (
        <div className="graph-mood">
            {data && <LineChart width={600} height={300} data={userData}>
                <XAxis dataKey="date" />
                <YAxis />
                <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="moodRanking" stroke="#8884d8" />
            </LineChart>}
        </div>
    )
}

export default MoodGraph
