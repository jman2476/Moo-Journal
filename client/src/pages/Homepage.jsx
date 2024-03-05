import React from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom'
import { useMutation } from '@apollo/client'

import { useState } from 'react'
import { CowPatternBg } from '../components';
import '../styles/pages/homepage.scss'

import { useStore } from '../store'
import { LOGOUT_USER } from '../graphql/mutations';

function Homepage() {

    const navigate = useNavigate()

    const { state, setState } = useStore()
    const [logoutUser] = useMutation(LOGOUT_USER)
    const location = useLocation(); // Get the current location

    const handleLogout = async () => {
        await logoutUser()

        setState({
            ...state,
            user: null
        })
        navigate('/')

    }

    // Determine if we're at the root path
    const isRootPath = location.pathname === '/';

    // Dynamic className based on the current path
    const headerClassName = isRootPath ? 'homepage' : 'not-homepage';

    return (
        <>
            <header className={headerClassName}>


                {state.user ? (
                    <>
                        <span className="logoContainer">
                            <h1 className="modak-regular"><a href="/">MooJournal</a></h1>
                            {state.user.username ? (
                                <h3>Welcome back, <span className='mj-text'>{state.user.username}</span></h3>
                            ) : (
                                <h3><span className='mj-text'></span></h3>
                            )}

                        </span>
                        <span className="dashboardBtn">
                            <NavLink className="btn" to='/entry'>Start New Entry</NavLink>
                            <NavLink className="btn" to='/mood_graph'>Check Your Charts</NavLink>
                            <NavLink className="btn" to='/my_journal'>
                                <span className='mj-text fw8'>Go To My MooJournal</span>
                            </NavLink>
                            <span onClick={() => handleLogout()} className='btn mj-text fw8'>Logout</span>
                        </span>
                    </>
                ) : (
                    <>


                        <span className="logoContainer">
                            <h1 className="modak-regular"><a href="/">MooJournal</a></h1>
                            <h3>Start your <span className=''> MooJournaling </span> journey!</h3>
                        </span>
                        <span className="btn-container">

                            <NavLink className="btn" to='/about'>What the hell is <span className='mj-text fw8'>MooJournal</span>?</NavLink>
                            <NavLink className="btn" to='/auth'>Login | Sign Up</NavLink>
                        </span>
                    </>
                )}
            </header>
        </>
    );
}

export default Homepage;
