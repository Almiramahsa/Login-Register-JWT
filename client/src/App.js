import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Username from './components/Username';
import PageNotFound from './components/PageNotFound';
import Password from './components/Password';
import Profile from './components/Profile';
import Register from './components/Register';
import Recovery from './components/Recovery';
import Reset from './components/Reset';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Username />} />
        <Route path="/register" element={<Register />} />
        <Route path="/password" element={<Password />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/recovery" element={<Recovery />} />
        <Route path="/reset" element={<Reset />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
