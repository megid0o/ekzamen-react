import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import Home from './pages/Home/Home'
import Events from './pages/Events/Events'
import EventDetails from './pages/EventDetails/EventDetails'
import About from './pages/About/About'
import AddEvent from './pages/AddEvent/AddEvent'
import './App.css'

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/events" element={<Events />} />
            <Route path="/event/:id" element={<EventDetails />} />
            <Route path="/about" element={<About />} />
            <Route path="/add-event" element={<AddEvent />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App