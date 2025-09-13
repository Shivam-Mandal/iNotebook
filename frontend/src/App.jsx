import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import NoteState from './context/notes/NoteState';
import Login from './components/Login';
import Signup from './components/Signup';
import { useState } from 'react';
import Alert from './components/Alert';
import Accounts from './components/Accounts';
import LandingPage from './components/LandingPage';

function App() {
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type
    });
    setTimeout(() => {
      setAlert(null);
    }, 3000);
  };

  return (
    <NoteState>
      <Router>
        <div className="min-h-screen flex flex-col bg-slate-100">
          <Navbar />
          <Alert alert={alert} />
          <main className="flex-grow w-full">
            <div className="max-w-screen-2xl mx-auto">
              <Routes>
                <Route exact path="/" element={<LandingPage />} />
                <Route exact path="/home" element={<Home showAlert={showAlert} />} />
                <Route exact path="/login" element={<Login showAlert={showAlert} />} />
                <Route exact path="/signup" element={<Signup showAlert={showAlert} />} />
                <Route exact path="/accounts" element={<Accounts />} />
              </Routes>
            </div>
          </main>
        </div>
      </Router>
    </NoteState>
  );
}

export default App;
