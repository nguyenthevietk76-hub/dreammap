import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import CosmicBackground from './components/CosmicBackground';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import PublicMap from './pages/PublicMap';
import AdminDashboard from './pages/AdminDashboard';
import VolunteerForm from './pages/VolunteerForm';
import MentorRegistration from './pages/MentorRegistration';
import GenericPage from './pages/GenericPage';
import JoinPage from './pages/JoinPage';
import StoryPage from './pages/StoryPage';
import AboutPage from './pages/AboutPage';
import DreamSubmissionPage from './pages/DreamSubmissionPage';

function AppContent() {
  const location = useLocation();
  const isMapRoute = location.pathname === '/map' || 
                     location.pathname === '/volunteer' || 
                     location.pathname === '/join';

  return (
    <>
      <CosmicBackground />
      <Navbar />
      
      {/* The Map stays mounted behind modals if we are on a map route */}
      {isMapRoute && <PublicMap />}

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/about" element={<AboutPage />} />
        
        {/* These routes just render the Modal over the map */}
        <Route path="/map" element={null} />
        <Route path="/volunteer" element={<VolunteerForm />} />
        <Route path="/join" element={<JoinPage />} />
        <Route path="/mentors" element={<MentorRegistration />} />
        
        {/* Standalone pages */}
        <Route path="/stories" element={<StoryPage />} />
        <Route path="/gui-uoc-mo" element={<DreamSubmissionPage />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
