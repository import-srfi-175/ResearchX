import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import Submit from "./components/Submit";
import AboutUs from './components/AboutUs';
import Footer from "./components/Footer";
import Hero from './components/Hero';


import './styles/App.css';

// Define a basic Home component if you don't have one yet
function Home() {
  return (
    <>
      <Navbar />
      <Hero />

    </>
  )
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />   {/* Home page route */}
        <Route path="/submit" element={<Submit />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />

      </Routes>
    </Router>
  );
}

export default App;
