import { useContext, createContext, useState, useEffect } from "react";
import { useQuery } from '@apollo/client';
import { AUTHENTICATE } from '../graphql/queries';

const Context = createContext();

export function StoreProvider({ children }) {
    const { data: userData } = useQuery(AUTHENTICATE);
    
    const initialState = {
        user: null,
        loading: true,
        bgBlur: false
    };

    const [state, setState] = useState(initialState);

    useEffect(() => {
        if (userData) {
            console.log(userData.authenticate);
            setState(prevState => ({
                ...prevState,
                user: userData.authenticate
            }));
        }
    }, [userData]);

    useEffect(() => {
        setTimeout(() => {
            console.log('page loaded');
            setState(prevState => ({
                ...prevState,
                loading: false
            }));
        }, 2000);
    }, []);

    return (
        <Context.Provider value={{ state, setState }}>
            {children}
        </Context.Provider>
    );
}

export const useStore = () => useContext(Context);