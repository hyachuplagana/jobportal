import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import './App.css'
import Headers from './components/Header'
import Home from './pages/Home'
import Footer from './components/Footer'
import SignUp from './pages/SignUp'
import RecruiterDashboard from './pages/RecruiterDashboard'
import PostJob from './components/PostJob'
import SignIn from './pages/SignIn'
import { useEffect } from 'react'
import ColorPalette from './pages/ColorPalette'
import AuthIn from './pages/AuthIn'


function AppLayout() {
  const location = useLocation();
    

  // Hide header + footer on login page
  const hideLayout = location.pathname === "/auth"

  return (
    <div className="flex flex-col min-h-screen">
      {!hideLayout && <Headers />}

      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          
          <Route path="/colors" element={<ColorPalette />}/>
         
          <Route path="/auth" element={<AuthIn/>}/>
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
