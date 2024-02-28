import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";


import 'tachyons'
import './App.css'

// Pages
import { Homepage, About, Login, MyMooJournal, NewJournalEntry, SignUp } from './pages';


// Components
import LoadingIndicator from './components/LoadingIndicator'
import Footer from './components/Footer'
import HeavyEntry from './components/HeavyEntry'
import LightEntry from './components/LightEntry'



function App() {

  const [loading, setLoading] = useState(true)

  const simulateLoading = (toggle) => {

    if(toggle){
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
        <Routes>
          <Route path="/" element={<Homepage />}/>
          <Route path="/about" element={<About />}/>
          <Route path="/login" element={<Login />}/>
          <Route path="/sign_up" element={<SignUp />}/>
          <Route path="/my_journal" element={<MyMooJournal />}/>
          {/* <Route path="/new_entry" element={<NewJournalEntry />}/> */}
          <Route path="/light_entry" element={<LightEntry />}/>
          <Route path="/heavy_entry" element={<HeavyEntry />}/>
        </Routes>

        <Footer />
      </>
  )
}

export default App
