import { useState, useEffect } from 'react'
import { GRAPH_MOOD } from '../graphql/queries'
import { useQuery } from '@apollo/client'
// import { CategoryScale, Chart } from "chart.js";
// import { Line } from 'react-chartjs-2'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'



function MoodGraph() {

    const [userData, setUserData] = useState([])
    
    useEffect(() => {
        const { loading, error, data } = useQuery(GRAPH_MOOD)
        console.log(data)
        setUserData(data)
    }, [])

    // console.log(data.graphMood.moodRanking)
    // const dataObj = 


    return (
        <div className="graph-mood">
            {data && <LineChart width={600} height={300} data={userData}>
                <XAxis dataKey="name" />
                <YAxis />
                <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="pv" stroke="#8884d8" />
                <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
            </LineChart>}
        </div>
    )
}

export default MoodGraph
