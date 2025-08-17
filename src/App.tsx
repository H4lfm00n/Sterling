import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import Layout from './components/Layout'
import Workspace from './pages/Workspace'
import Welcome from './pages/Welcome'
import { NoteProvider } from './contexts/NoteContext'
import { ThemeProvider } from './contexts/ThemeContext'

function App() {
  const [isFirstTime, setIsFirstTime] = useState(() => {
    const hasVisited = localStorage.getItem('sterling-has-visited')
    return !hasVisited
  })

  const handleFirstTimeComplete = () => {
    localStorage.setItem('sterling-has-visited', 'true')
    setIsFirstTime(false)
  }

  if (isFirstTime) {
    return <Welcome onComplete={handleFirstTimeComplete} />
  }

  return (
    <ThemeProvider>
      <NoteProvider>
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<Workspace />} />
              <Route path="/workspace" element={<Workspace />} />
            </Routes>
          </Layout>
        </Router>
      </NoteProvider>
    </ThemeProvider>
  )
}

export default App
