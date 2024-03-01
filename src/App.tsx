import './App.css';
import { useContext, useEffect } from 'react';
import { AuthContext } from './context/auth-context';
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';



import Header from './components/Header';
import Footer from './components/Footer';
import SignIn from './routes/SignIn';
import SignUp from './routes/SignUp';
import Profile from './routes/Profile';
import Home from './routes/Home';
import ForecastPage from './routes/ForecastPage';


function App() {
  const { currentUser } = useContext(AuthContext)
  const navigate = useNavigate()

  useEffect(() => {
    if (currentUser) {
   //   navigate('/profile')
    }
  }, [currentUser])
  
  return (
    <div className="App">
        <div>
          <Header title ="Твоя погода"/>      
          <Routes> 
            <Route path='/' element={<Home />} />
            <Route path="/sign-in" element={<SignIn />} /> 
            <Route path="/sign-up" element={<SignUp />} /> 
            <Route path="/profile" element={currentUser ? <Profile />: <SignIn />} />
            <Route path="/forecast/:city" element={<ForecastPage />} />
          </Routes>
        </div>   
      <Footer />
    </div>
  );
}

export default App;
