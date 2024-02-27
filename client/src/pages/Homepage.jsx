import React from 'react';
import {NavLink} from 'react-router-dom'

import { useState } from 'react'
import { getUserName } from '../../services/userService';
import AdminControl from '../components/AdminControl-2';
import CowPatternBg from '../components/CowPatternBg';
import '../styles/pages/homepage.scss'

function Homepage() {

    const [isLoggedIn, setLoggedIn] = useState(false)
    const [userName, setUserName] = useState(getUserName())

    const adminObj = {
        runFxn(){
            setLoggedIn(!isLoggedIn)
        },
        msg:'Change Logged in state'
    }

    return (
        <>
            <AdminControl adminObj={adminObj} />
            <CowPatternBg/>

            <div className='
                homepage 
                flex 
                flex-column 
                justify-center 
                items-center 
                absolute--fill'>
                <h1  className="modak-regular tc">MooJournal</h1>
                { isLoggedIn ? 
                    <>
                        <h3>Welcome back, <span className='mj-text'>{userName}</span></h3>
                        <span>
                            <NavLink className="btn" to='/new_entry'>Start Writing</NavLink>
                            <NavLink className="btn" to='/my_journal'><span className='mj-text fw8'>My MooJournal</span></NavLink>
                        </span> 
                    </>
                    :
                    <>
                        <h3>Start your <span className=''> MooJournaling </span> journey.</h3>
                        <span>
                            <NavLink className="btn flex-s flex-column-s tc-s items-center-s" to='/about'>What the hell is <span className='mj-text fw8'>MooJournal</span>?</NavLink>
                            <NavLink className="btn" to='/login'>Login</NavLink>
                            <NavLink className="btn" to='/sign_up'>Sign Up</NavLink>
                        </span> 
                    </>   
                }           
            </div>

        </>
    );
}

export default Homepage;
