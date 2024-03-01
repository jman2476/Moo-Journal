import { useContext, createContext, useState, useEffect } from "react"
import { useQuery } from '@apollo/client'
// import {AUTHENTICATE} from '../graphql'

const Context = createContext()

export function StoreProvider({children}){

    // const { data: userData } = useQuery(AUTHENTICATE) // correct userData obj
    const userData = { authenticate: true } // simulated obj

    const [state, setState] = useState({
        user:null,
        loading: true
    })

    useEffect(() => {
        if(userData){
            setState({
                ...state,
                user:userData.authenticate,
                loading:false
            })
        }
    }, [userData])


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