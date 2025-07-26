import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import LandingPage from './pages/Landing';
import Footer from './components/Footer';
import LoginPage from './pages/Login';
import RegisterPage from './pages/Register';
import ForgotPasswordPage from './pages/ForgotPassword';
import { Toaster } from 'react-hot-toast';
import Dashboard from './pages/Dashboard';
import PrivateRoute from './components/PrivateRoutes';
import DashboardHome from './pages/DashboardHome';

function App() {
  return (
    <>
      <Navbar />
      <Toaster position="top-center" />
      <div className="pt-16 min-h-screen flex flex-col justify-between">
         <div className="flex-1">
           <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/register' element={<RegisterPage />} />
            <Route path='/forgot-password' element={<ForgotPasswordPage />} />


           <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            >
              {/* ✅ Nested routes inside Dashboard layout */}
               <Route index element={<DashboardHome />} />

            </Route>

           </Routes>
         </div>
           <Footer />
      </div>
    </>
  );
}

export default App;
