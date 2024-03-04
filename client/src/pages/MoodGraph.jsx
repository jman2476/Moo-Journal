import { useState, useEffect } from 'react'
import { GRAPH_MOOD } from '../graphql/queries'
import { useQuery } from '@apollo/client'


function MoodGraph() {



const {loading, error, data} = useQuery(GRAPH_MOOD)
// const {user, moodRanking, date} = 
console.log(data)

    return (
        <div className="graph-mood">
            <canvas id="mood_graph"></canvas>
        </div>
    )
}

export default MoodGraph