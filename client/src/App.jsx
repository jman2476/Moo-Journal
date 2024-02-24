import { useEffect, useState } from 'react'

import 'tachyons'
import './App.css'
import Homepage from './pages/Homepage'
import LoadingIndicator from './components/LoadingIndicator'


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
    simulateLoading(true)
    
    // page finished loading
    // setLoading(false)    
  })


  return (
    loading ?
      <LoadingIndicator />
      :
    <>
      <Homepage />
    </>
  )
}

export default App
