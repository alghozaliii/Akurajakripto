import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import HomePage from './pages/HomePage';
import Beranda from './pages/Beranda';
import Dashboard from './pages/Dashboard';
import Pricing from './pages/Pricing';
import Community from './pages/community';
import ApiAccess from './pages/ApiAccess';
import Blog from './pages/Blog';
import Faq from './pages/Faq';
import Kontak from './pages/Kontak';
import Login from './pages/Login';
import Register from './pages/Register';
import './styles/globals.css';
import { PlanProvider } from './context/PlanContext';

function App() {
  return (
    <PlanProvider>
      <div className="min-h-screen bg-gray-900 flex flex-col">
        <Router>
          <Header />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Beranda />} />
              <Route path="/home" element={<HomePage />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/community" element={<Community />} />
              <Route path="/api-access" element={<ApiAccess />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/faq" element={<Faq />} />
              <Route path="/kontak" element={<Kontak />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Routes>
          </main>
          <Footer />
        </Router>
      </div>
    </PlanProvider>
  );
}

export default App;