import { useContext, createContext, useState, useEffect } from "react"
import { useQuery } from '@apollo/client'
import {AUTHENTICATE} from '../graphql'

const Context = createContext()

export function StoreProvider({children}){

    // const { data: userData } = useQuery(AUTHENTICATE)


    const [state, setState] = useState({
        user:null
    })


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