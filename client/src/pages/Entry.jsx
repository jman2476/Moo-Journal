import {useStore} from '../store'

function Entry(){

    const { state, setState } = useStore()

    console.log()
    return (
        <>
            <h1>{state.entryType} Entry</h1>
        </>
    )
}

export default Entry