import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Username from './components/Username';
import PageNotFound from './components/PageNotFound';
import Password from './components/Password';
import Profile from './components/Profile';
import Register from './components/Register';
import Recovery from './components/Recovery';
import Reset from './components/Reset';

import { AuthorizeUser, ProtectRoute } from './middleware/auth.js';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Username />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/password"
          element={
            <ProtectRoute>
              <Password />
            </ProtectRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <AuthorizeUser>
              <Profile />
            </AuthorizeUser>
          }
        />
        <Route path="/recovery" element={<Recovery />} />
        <Route path="/reset" element={<Reset />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
