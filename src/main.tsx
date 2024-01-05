import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import HomePage from './page/HomePage'
import AIPage from './page/AIPage'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Router>
      <Routes location={location}>
        <Route path='/' element={<HomePage/>}></Route>
        <Route path='/AI' element={<AIPage/>}></Route>
      </Routes>
    </Router>
  </React.StrictMode>,
)
