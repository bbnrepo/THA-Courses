// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import AssociateToken from './pages/AssociateToken';
import TransferToken from './pages/TransferToken';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import { AnimatePresence } from 'framer-motion';

function App() {
  return (
    <Router>
      <div className="flex flex-col h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-gray-50 overflow-hidden">
        <Navbar />
        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar fixed width and scroll-independent */}
          <div className="hidden md:block">
            <Sidebar />
          </div>

          {/* Main content scrolls independently */}
          <main className="flex-1 overflow-y-auto p-4 md:p-6">
            <AnimatePresence mode="wait">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/associate" element={<AssociateToken />} />
                <Route path="/transfer" element={<TransferToken />} />
              </Routes>
            </AnimatePresence>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;