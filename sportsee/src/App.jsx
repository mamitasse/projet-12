import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import Dashboard from './components/Dashboard/Dashboard';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/dashboard/:userId" element={<Dashboard />} />
            </Routes>
        </Router>
    );
};

export default App;
