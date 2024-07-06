import './App.css'
import {
  BrowserRouter as Router,
  Route,
  Routes
} from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './components/Home'
import NoteState from './context/notes/NoteState'
import Login from './components/Login'
import Signup from './components/Signup'
import { useState } from 'react'
import Alert from './components/Alert'
import Accounts from './components/Accounts'
import LandingHero from './components/LandingHero';
import Footer from './components/Footer';
function App() {
  const [alert,setAlert] = useState(null);
  const showAlert=(messge,type)=>{
    setAlert({
      msg:messge,
      type:type
    })
    setTimeout(()=>{
      setAlert(null)
    },3000)
  }
  return (
    <>
    <NoteState>

        <Router>
          <Navbar />
          <Alert alert={alert}/>
          <div className=" max-w-screen-2xl py-0 bg-slate-100">
          <Routes>
             {/* Landing Page Routes */}
             <Route exact path="/" element={<LandingHero />} />

            <Route exact path="/home" element={<Home showAlert={showAlert}/>} />
            <Route exact path="/login" element={<Login showAlert={showAlert}/>} />
            <Route exact path="/signup" element={<Signup showAlert={showAlert}/>} />
            <Route exact path="/accounts" element={<Accounts/>} />
          </Routes>
          </div>
    <Footer/>
        </Router>
    </NoteState>

    </>
  )
}

export default App
