import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import LandingPage from './pages/Landing';
import Footer from './components/Footer';

function App() {
  return (
    <>
      <Navbar />
      <div className="pt-16 min-h-screen flex flex-col justify-between">
         <div className="flex-1">
           <Routes>
            <Route path="/" element={<LandingPage />} />
           </Routes>
         </div>
           <Footer />
      </div>
    </>
  );
}

export default App;
