import { useContext, createContext, useState, useEffect } from "react"
import { useQuery } from '@apollo/client'

// import {AUTHENTICATE} from '../graphql'

const Context = createContext()

export function StoreProvider({children}){

    // const { data: userData } = useQuery(AUTHENTICATE) // correct userData obj

    const [state, setState] = useState({
        user:{ _id:1, username:'cjswayne'},  // simulated
        user:null, // simulated
        loading: true
    })

    // useEffect(() => {
    //     if(userData){
    //         setState({
    //             ...state,
    //             // user:userData.authenticate,
    //             loading:false
    //         })
    //     }
    // }, [userData])


    return (
        <Context.Provider value={{
            state,
            setState
        }}>
            {children}
        </Context.Provider>
    )
}

export const useStore = () => useContext(Context)