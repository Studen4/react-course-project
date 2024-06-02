import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/login.jsx';
import Register from './pages/register.jsx';
import Forum from './pages/forum.jsx';
import Topic from './pages/topic.jsx';
import Chat from './pages/chat.jsx';
import PersonalPage from './pages/personal-page.jsx';
import ProfileSettings from './pages/profile-settings.jsx';
import CreateSale from './pages/create-sale.jsx';
import Marketplace from './pages/marketplace.jsx';
import CreateTopic from './pages/create-topic.jsx';

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/personal-page"element={<PersonalPage />} />
          <Route path="/forum" element={<Forum />} /> 
          <Route path="/topic/:id" element={<Topic />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/profile-settings" element={<ProfileSettings />} />
          <Route path="/create-sale" element={<CreateSale />} />
          <Route path="/create-topic" element={<CreateTopic />} />
          <Route path="/marketplace" element={<Marketplace />} /> 
        </Routes>
      </div>
    </Router>
  );
};

export default App;