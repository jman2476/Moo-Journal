import React from 'react';
import cowPic from '../assets/cow-hp-bg.jpg';
import { useState } from 'react'
import AdminControl from '../components/adminControl';


function Homepage() {


    // TODO: finish this function so that it will return the username of the user
    // logged in
    const getUserName = () => {
        return 'cjswayne'
    }

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
                        <h3  className="modak-regular">Welcome back, {userName}</h3>
                        <span>
                            <button>Start Writing</button>
                        </span> 
                    </>
                    :
                    <>
                        <h3  className="modak-regular">Start your MooJournaling journey.</h3>
                        <span>
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
