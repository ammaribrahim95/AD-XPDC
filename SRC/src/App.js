import React, { useMemo, useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { Provider, useDispatch, useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import store from './redux/store';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import ProtectedRoute from './components/ProtectedRoute';
import Register from './pages/Auth/Register';
import NotFound from './pages/NotFound';
import PartMaster from './pages/Admin/PartMaster';
import Login from './pages/Auth/Login';
import { Roles } from './utils/roles';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from './firebase/config';
import { setUser, logout } from './redux/authSlice';
import CircularProgress from '@mui/material/CircularProgress';

const drawerWidth = 220;
const collapsedWidth = 64;

function AuthGuard({ authReady, children }) {
  const user = useSelector((state) => state.auth.user);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!authReady) return; // do nothing until auth state is checked
    if (!user && location.pathname !== '/login' && location.pathname !== '/register') {
      navigate('/login');
    }
    if (user && (location.pathname === '/login' || location.pathname === '/register')) {
      navigate('/');
    }
  }, [user, location.pathname, navigate, authReady]);
  return children;
}

function AppShell() {
  // Theme
  const [mode, setMode] = useState('light');
  const theme = useMemo(() => createTheme({ palette: { mode } }), [mode]);
  const toggleTheme = () => setMode((m) => (m === 'light' ? 'dark' : 'light'));

  const location = useLocation();
  // Sidebar open/collapse (start CLOSED!)
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [sidebarTempOpen, setSidebarTempOpen] = useState(false);

  // Redux auth
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const [authReady, setAuthReady] = useState(false);

  // Effect: After login, close the sidebar by default
  useEffect(() => {
    if (user) setSidebarOpen(false);
  }, [user]);

  // Listen to Firebase Auth state & set authReady
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        dispatch(setUser({
          email: firebaseUser.email,
          uid: firebaseUser.uid,
        }));
      } else {
        dispatch(logout());
      }
      setAuthReady(true);
    });
    return unsub;
  }, [dispatch]);

  // Sidebar logic
  const handleSidebarMenu = () =>
    isMobile ? setSidebarTempOpen(true) : setSidebarOpen((v) => !v);
  const handleSidebarClose = () => setSidebarTempOpen(false);
  const sideBarActualOpen = isMobile ? sidebarTempOpen : sidebarOpen;

  // Logout logic
  const onLogout = async () => {
    await signOut(auth);
    dispatch(logout());
  };

  // For AppBar flex with sidebar: add marginLeft like content area
  const getMarginLeft = () => {
    if (!user || isMobile) return 0;
    return sidebarOpen ? `${drawerWidth}px` : `${collapsedWidth}px`;
  };

  // Render loader while determining auth
  if (!authReady) {
    return (
      <Box width="100vw" height="100vh" display="flex" alignItems="center" justifyContent="center" bgcolor={theme.palette.background.default}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <AuthGuard authReady={authReady}>
        <Box sx={{ display: 'flex' }}>
          <CssBaseline />
          <Box
            sx={{
              width: '100%',
              zIndex: theme.zIndex.drawer + 1,
              position: 'fixed',
              top: 0,
              left: 0,
              marginLeft: getMarginLeft(),
              transition: 'margin 0.2s',
            }}
          >
            <Navbar
              theme={mode}
              toggleTheme={toggleTheme}
              user={user}
              onLogout={onLogout}
              onMenuClick={handleSidebarMenu}
            />
          </Box>
          {/* Sidebar Drawer */}
          {user && (isMobile ? (
            <Sidebar open={sideBarActualOpen} onToggle={handleSidebarClose} />
          ) : (
            <Sidebar open={sidebarOpen} onToggle={() => setSidebarOpen((v) => !v)} />
          ))}
          {/* Main content flexes to sidebar width on desktop */}
          <Box
            component="main"
            sx={theme => ({
              flexGrow: 1,
              p: 3,
              transition: 'margin 0.2s',
              width: '100vw',
              marginLeft: (!user || isMobile)
                ? 0
                : sidebarOpen
                ? `${drawerWidth}px`
                : `${collapsedWidth}px`,
              minHeight: '100vh',
              background: theme.palette.background.default,
            })}
          >
            {/* Offset for fixed AppBar */}
            <Box sx={{ minHeight: 64 }} />
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
          </Box>
        </Box>
      </AuthGuard>
    </ThemeProvider>
  );
}

const App = () => (
  <Provider store={store}>
    <Router>
      <AppShell />
    </Router>
  </Provider>
);

export default App;
