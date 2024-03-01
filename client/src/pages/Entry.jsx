import { useStore } from '../store'

function Entry() {

    const { state, setState } = useStore()
    return (
        <>
            <h1>Light Entry</h1>

            <LightEntryEditor />

            {/* <h1>{state.entryType} Entry</h1>
            {state.entryType === 'Heavy' ? (
                <>
                    <HeavyEntryEditor/>
                </>
            ) : (
                <>
                    <LightEntryEditor/>
                </>
            )} */}
        </>
    )
}

export default Entry