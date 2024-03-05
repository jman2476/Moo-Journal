import { useState, useEffect } from 'react'
import { GRAPH_MOOD } from '../graphql/queries'
import { useQuery } from '@apollo/client'

import { LineChart, Line, BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'



function MoodGraph() {

    const { loading, error, data } = useQuery(GRAPH_MOOD)
    const [userData, setUserData] = useState([])
    const [histogram, setHistogram] = useState([])


    useEffect(() => {
        if (data) {
            let dataOrganizer = []
            let histOrganizer = [
                { mood: 0, amnt: 0 },
                { mood: 1, amnt: 0 },
                { mood: 2, amnt: 0 },
                { mood: 3, amnt: 0 },
                { mood: 4, amnt: 0 },
                { mood: 5, amnt: 0 },
                { mood: 6, amnt: 0 },
                { mood: 7, amnt: 0 },
                { mood: 8, amnt: 0 },
                { mood: 9, amnt: 0 },
                { mood: 10, amnt: 0 }
            ]
            console.log(data.graphMood.date)
            console.log(data.graphMood.moodRanking)
            console.log(userData)
            for (let i in data.graphMood.moodRanking) {
                console.log(histOrganizer[i].mood)
                dataOrganizer.push({
                    date: data.graphMood.date[i],
                    moodRanking: data.graphMood.moodRanking[i]
                })
                histOrganizer[data.graphMood.moodRanking[i]].amnt += 1
            }
            setUserData(dataOrganizer)
            setHistogram(histOrganizer)
        }
    }, [data])

    if (loading) return 'Loading...';
    if (error) return `Error! ${error.message}`;
    console.log(userData)

    return (
        <div className="graph-mood">
            <div>

                <h2>Your Mood over time</h2>
                {data && <LineChart width={600} height={300} data={userData}>
                    <XAxis dataKey="date" />
                    <YAxis />
                    <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="moodRanking" stroke="#8884d8" />
                </LineChart>}
            </div>
            <div>
                <h2>Mood Histogram</h2>
                {data &&
                    <BarChart
                        width={500}
                        height={300}
                        data={histogram}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="mood" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="amnt" fill="#8884d8" activeBar={<Rectangle fill="brown" stroke="brown" />} />
                    </BarChart>
                }

            </div>
        </div>
    )
}

export default MoodGraph
