import { useEffect } from "react";
import { useStore } from "../store";
import { useLocation, useNavigate } from "react-router-dom";


function Protect({ children }) {
    const { state } = useStore()
    const location = useLocation()
    const navigate = useNavigate()

    useEffect(() => {
        if (!state.loading) {
            if (!state.loading) {
                if (!state.user && !location.pathname.includes('auth')) {
                    navigate('/auth', {state: {message: 'Please login to access this page!'}});
                }

                if (state.user && location.pathname === '/auth') {
                    navigate('/my_journal');
                }
            }
        }
    }, [state.user, state.loading, location.pathname, navigate])

    return (
        <>
            {children}
        </>
    )
}

export default Protect