import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import SSEListener from './SSEListenere'
import Rider from './Rider'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <SSEListener />
      <Routes>
        <Route path='/' element={<App />} />
        <Route path='/rider' element={<Rider />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
