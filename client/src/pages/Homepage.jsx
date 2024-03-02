import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom'
import { useMutation } from '@apollo/client'

import { useState } from 'react'
import { CowPatternBg, AddNewEntry } from '../components';
import '../styles/pages/homepage.scss'

import { useStore } from '../store'
import { LOGOUT_USER } from '../graphql/mutations';

function Homepage() { 

    const { state, setState } = useStore()
    const [logoutUser] = useMutation(LOGOUT_USER)

    const handleLogout = async () => {
        await logoutUser()

        setState({
            ...state,
            user: null
        })
        navigate('/')

    }

    return (
        <>
            {/* <CowPatternBg/> */}

            <div className='homepage' style={{ position: 'relative', zIndex: 1 }}>
                <h1 className="modak-regular">MooJournal</h1>
                {state.user ?
                    <>
                        <h3>Welcome back, <span className='mj-text'>{state.user.username}</span></h3>
                        <span>
                            <AddNewEntry />
                            <NavLink className="btn" to='/my_journal'>
                                <span className='mj-text fw8'>Go To My MooJournal</span>
                            </NavLink>
                            <span onClick={() => handleLogout()} className='btn mj-text fw8'>Logout</span>


                        </span>
                    </>
                    :
                    <>
                        <h3>Start your <span className=''> MooJournaling </span> journey.</h3>
                        <span>
                            <NavLink className="btn" to='/about'>What the hell is <span className='mj-text fw8'>MooJournal</span>?</NavLink>
                            <NavLink className="btn" to='/auth'>Login | Sign Up</NavLink>
                        </span>
                    </>
                }
            </div>

        </>
    );
}

export default Homepage;
