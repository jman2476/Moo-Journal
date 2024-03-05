import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";


import 'tachyons'
import './App.css'

// Pages
import { Homepage, About, AuthForm, Feedback, MyMooJournal, NotFound, Entry, MoodGraph } from './pages';


// Components
import { LoadingIndicator, Footer } from './components'

import { useStore } from './store'


function App() {

  const { state, setState } = useStore()

  const [loading, setLoading] = useState(true)

  const simulateLoading = (toggle) => {

    if (toggle) {
      const delayedFunction = () => {
        setLoading(false)
      };

      // Set a timeout to execute the function after 10 seconds
      const timeoutId = setTimeout(delayedFunction, 2000);

      // Clean-up function to clear the timeout if the component unmounts
      return () => clearTimeout(timeoutId);
    } else {
      setLoading(false)
    }
  }

  useEffect(() => {
    // If you want to simulate loading screen
    // simulateLoading(false)

    setLoading(false)
  })


  return (

    loading ?
      <LoadingIndicator />
      :
      <>
        {state.bgBlur && <div className="modal-backdrop"></div>}
        <Homepage />
        <Routes>
          <Route path="/"/>
          <Route path="/about" element={<About />} />
          <Route path="/entry" element={<Entry />} />
          <Route path="/auth" element={<AuthForm />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/my_journal" element={<MyMooJournal />} />
         
          <Route path="/mood_graph" element={<MoodGraph />}/>
          <Route path="*" element={<NotFound />} />

        </Routes>

        <Footer />
      </>
  )
}

export default App
