import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import 'tachyons'
import './App.css'

import { NavLink, useNavigate, useLocation } from 'react-router-dom'
// Pages
import { Homepage, About, AuthForm, Feedback, MyMooJournal, NotFound, Entry, MoodGraph } from './pages';
import Protect from './components/Protect';

// Components
import { LoadingIndicator, Footer } from './components'

import { useStore } from './store'


function App() {

  const { state, setState } = useStore()
  const location = useLocation(); // Get the current location

  // const [loading, setLoading] = useState(true)

  // const simulateLoading = (toggle) => {

  //   if (toggle) {
  //     const delayedFunction = () => {
  //       setLoading(false)
  //     };

  //     // Set a timeout to execute the function after 10 seconds
  //     const timeoutId = setTimeout(delayedFunction, 2000);

  //     // Clean-up function to clear the timeout if the component unmounts
  //     return () => clearTimeout(timeoutId);
  //   } else {
  //     setLoading(false)
  //   }
  // }


  return (

    <>
      {state.loading ? (
        <LoadingIndicator />
      ) : (
        <>
          {state.bgBlur && <div className="modal-backdrop"></div>}
          {location.pathname !== '/' && <Homepage />}
          <Routes>
            <Route path="/about" element={<About />} />
            <Route path="/" element={<Homepage />} />
            <Route path="/entry" element={
              <Protect>
                <Entry />
              </Protect>
            } />
            <Route path="/auth"
              element={
                <Protect>
                  <AuthForm />
                </Protect>
              } />
            <Route path="/feedback" element={<Feedback />} />
            <Route path="/my_journal"
              element={
                <Protect>
                  <MyMooJournal />
                </Protect>
              } />
            <Route path="/mood_graph" element={
              <Protect>
                <MoodGraph />
              </Protect>
            } />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
        </>
      )}
    </>
  );
}

export default App
