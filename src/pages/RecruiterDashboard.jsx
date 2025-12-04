import React from 'react'
import { Link, Route, Routes } from 'react-router-dom'
import PostJob from '../components/PostJob'


const RecruiterDashboard = () => {
  return (
    <div>
        <nav>
            <Link to="postjob">Post Job</Link>
            
        </nav>
        <Routes>
            <Route path='postjob' element={<PostJob/>}/>
        </Routes>
    </div>
  )
}

export default RecruiterDashboard