import './App.css'
import {
  BrowserRouter as Router,
  Route,
  Routes
} from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './components/Home'
import About from './components/About'
import NoteState from './context/notes/NoteState'
import Login from './components/Login'
import Signup from './components/Signup'
import { useState } from 'react'
import Alert from './components/Alert'
function App() {
  const [alert,setAlert] = useState(null);
  const showAlert=(messge,type)=>{
    setAlert({
      msg:messge,
      type:type
    })
    setTimeout(()=>{
      setAlert(null)
    },20000)
  }

  return (
    <>
    <NoteState>

        <Router>
          <Navbar />
          <Alert alert={alert}/>
          <div className=" max-w-screen-xl px-48 py-2">
          <Routes>
            <Route exact path="/" element={<Home showAlert={showAlert}/>} />
            <Route exact path="/about" element={<About />} />
            <Route exact path="/login" element={<Login showAlert={showAlert}/>} />
            <Route exact path="/signup" element={<Signup showAlert={showAlert}/>} />
            {/* <Route exact path="/account" element={<Account/>} /> */}
          </Routes>
          </div>
        </Router>
    </NoteState>

    </>
  )
}

export default App
