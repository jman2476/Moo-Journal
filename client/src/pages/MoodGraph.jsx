import { useState, useEffect } from 'react'
import { GRAPH_MOOD } from '../graphql/queries'
import { useQuery } from '@apollo/client'
import { Line } from 'react-chartjs-2'


function MoodGraph() {

    const {loading, error, data} = useQuery(GRAPH_MOOD)

    useEffect(() => {
        console.log(data.graphMood)
    }, [])
 
// console.log(data.graphMood.moodRanking)
// const dataObj = { 
//     labels: data.graphMood.date,
//     datasets: [{
//         data: data.graphMood.moodRanking}],
// }


    return (
        <div className="graph-mood">
            {/* <Line 
                // options={}
                data={dataObj}
                /> */}
        </div>
    )
}

export default MoodGraph
