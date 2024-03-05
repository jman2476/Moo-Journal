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
                    navigate('/auth');
                }

                if (state.user && location.pathname === '/auth') {
                    navigate('/my_journal');
                }
            }
        }
    }, [state.user])

    return (
        <>
            {children}
        </>
    )
}

export default Protect