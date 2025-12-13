import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import './App.css'
import Headers from './components/Header'
import Home from './pages/Home'
import Footer from './components/Footer'
import RecruiterDashboard from './pages/RecruiterDashboard'
import { useEffect } from 'react'
import ColorPalette from './pages/ColorPalette'
import AuthIn from './pages/AuthIn'
import ResetPasssword from './pages/ResetPasssword'
import { AuthProvider } from './context/AuthContext'
import CandidateDashboard from './pages/CandidateDashboard.jsx'
import RecruiterHome from './components/dashboard/recruiter/RecruiterHome'
import PostJob from './components/dashboard/recruiter/PostJob'
import CandidateHome from './components/dashboard/candidate/CandidateHome.jsx'

function AppLayout() {
  const location = useLocation();

  // Hide header + footer on login page
  const hideLayout = location.pathname === "/auth" ||
    location.pathname === "/forgot-password" ||
    location.pathname.startsWith("/recruiter-dashboard") ||
    location.pathname.startsWith("/candidate-dashboard")

  return (
    <div className="flex flex-col min-h-screen">
      {!hideLayout && <Headers />}

      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/colors" element={<ColorPalette />} />
          <Route path="/auth" element={<AuthIn />} />
          <Route path="/forgot-password" element={<ResetPasssword />} />

          {/* Recruiter Dashboard with nested routes */}
          <Route path="/recruiter-dashboard" element={<RecruiterDashboard />}>
            <Route index element={<RecruiterHome />} />
            <Route path="postjob" element={<PostJob />} />
          </Route>

          {/* Candidate Dashboard with nested routes */}
          <Route path="/candidate-dashboard" element={<CandidateDashboard />}>
            <Route index element={<CandidateHome />} />
            {/* <Route path="jobs" element={<JobSearch />} /> */}
            {/* <Route path="applications" element={<Applications />} /> */}
            {/* <Route path="profile" element={<Profile />} /CandidateHome />> */}
          </Route>
        </Routes>
      </main>

      {!hideLayout && <Footer />}
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppLayout />
      </AuthProvider>
    </BrowserRouter>
  );
}