import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import LandingPage from './pages/Landing';
import Footer from './components/Footer';
import LoginPage from './pages/Login';
import RegisterPage from './pages/Register';

function App() {
  return (
    <>
      <Navbar />
      <div className="pt-16 min-h-screen flex flex-col justify-between">
         <div className="flex-1">
           <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/register' element={<RegisterPage />} />
           </Routes>
         </div>
           <Footer />
      </div>
    </>
  );
}

export default App;
