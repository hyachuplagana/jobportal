import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import './App.css'
import Headers from './components/Header'
import Login from './pages/Login'
import Home from './pages/Home'
import Footer from './components/Footer'
import SignUp from './pages/SignUp'
import RecruiterDashboard from './pages/RecruiterDashboard'
import PostJob from './components/PostJob'


function AppLayout() {
  const location = useLocation();

  // Hide header + footer on login page
  const hideLayout = location.pathname === "/login" || location.pathname === "/signup";

  return (
    <div className="flex flex-col min-h-screen">
      {!hideLayout && <Headers />}

      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp/>}/>
          <Route path="/recruiterdashboard/*" element={<RecruiterDashboard/>}/>
          
          
        </Routes>
      </main>

      {!hideLayout && <Footer />}
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  );
}
