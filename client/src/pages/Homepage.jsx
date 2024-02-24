import React from 'react';
import cowPic from '../assets/cow-hp-bg.jpg';
import { useState } from 'react'
import AdminControl from '../components/adminControl';
import { getUserName } from '../../services/userService';


function Homepage() {

    const [isLoggedIn, setLoggedIn] = useState(false)
    const userName = getUserName()

    const toggleLoginStatus = () => {
        console.log('Does this work?')
        setLoggedIn(!isLoggedIn)
    }

    const adminObj = {
        runFxn(){
            toggleLoginStatus()
        },
        msg:'Change Logged in state'
    }

    return (
        <>
            <AdminControl adminObj={adminObj} />
            
            <div className="hp-backdrop">
                <img src={cowPic} alt="Background" className="hp-image" />
                <img src={cowPic} alt="Background" className="hp-image" />
            </div>
            <div className='homepage' style={{ position: 'relative', zIndex: 1 }}>
                <h1  className="modak-regular">MooJournal</h1>
                { isLoggedIn ? 
                    <>
                        <h3>Welcome back, <span className='mj-text'>{userName}</span></h3>
                        <span>
                            <button>Start Writing</button>
                            <button className='mj-text fw8'>My MooJournal</button>
                        </span> 
                    </>
                    :
                    <>
                        <h3>Start your <span className=''> MooJournaling </span> journey.</h3>
                        <span>
                            <button>What the hell is <span className='mj-text fw8'>MooJournal</span>?</button>
                            <button>Login</button>
                            <button>Sign Up</button>
                        </span> 
                    </>   
                }           
            </div>
            <style>{`
                @keyframes slide {
                    from { transform: translateX(0); }
                    to { transform: translateX(-50%); } // Moves the container to show the second image, then resets
                }
                body{
                    overflow:hidden;
                }
            `}</style>
        </>
    );
}

export default Homepage;
