import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import NotFound from './pages/NotFound';
import PartMaster from './pages/Admin/PartMaster';
import { Roles } from './utils/roles';

// ... Import other pages as needed

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <Sidebar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route element={<ProtectedRoute allowedRoles={[Roles.ADMIN]} /> }>
            <Route path="/admin/part-master" element={<PartMaster />} />
            {/* Other admin protected routes */}
          </Route>
          {/* Other role-protected routes here */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
