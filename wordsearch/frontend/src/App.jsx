import { useState } from 'react'
import './App.css'
import Generator from './Pages/Generator.jsx'
import Game from './Pages/Game.jsx'
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom'

function HomeScreen() {
  const navigate = useNavigate();
  const [count, setCount] = useState(0)

  return (
    <>
      <h1>Word Search</h1>
      <div className="card">
        <button onClick={() => navigate('/generator')}>
          Play
        </button>
        <p>
          Click play to make a wordsearch game!
        </p>
      </div>
    </>
  )
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/generator" element={<Generator />} />
        <Route path="/game" element={<Game />} />
      </Routes>
    </Router>
  )
}
