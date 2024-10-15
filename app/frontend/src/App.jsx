import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import Browse from './components/Browse';
import Recent from './components/Recent';
import Submit from './components/Submit';
import AboutUs from './components/AboutUs';
import PaperDetail from './components/PaperDetail';
import Footer from './components/Footer';
import Hero from './components/Hero';
import { AuthProvider } from './contexts/AuthContext'; // Import AuthProvider

import './styles/App.css';

function Home() {
  return (
    <>
      <Hero />
      {/* Add other components or content for Home */}
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <div id="root">
          <Navbar />
          <div className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/browse" element={<Browse />} />
              <Route path="/recent" element={<Recent />} />
              <Route path="/submit" element={<Submit />} />
              <Route path="/aboutus" element={<AboutUs />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/paper/:id" element={<PaperDetail />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}


export default App;
