import { useState, useEffect } from 'react'
import { GRAPH_MOOD } from '../graphql/queries'
import { useQuery } from '@apollo/client'
import { Line } from 'react-chartjs-2'


function MoodGraph() {

    const {loading, error, data} = useQuery(GRAPH_MOOD)
    console.log(data)
    // console.log(data.graphMood)

    // useEffect(() => {
    // }, [])
 
// console.log(data.graphMood.moodRanking)
// const dataObj = 


    return (
        <div className="graph-mood">
            {data && <Line 
                // options={}
                data={{ 
                    labels: data.graphMood.date.map(date => new Date(date).toLocaleDateString()),
                    datasets: [{
                        data: data.graphMood.moodRanking}],
                }}
                />}
        </div>
    )
}

export default MoodGraph
