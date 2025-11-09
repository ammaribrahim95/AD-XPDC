import React, { useState } from 'react';
import { TextField, Button, Typography, Box, Alert, CircularProgress } from '@mui/material';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase/config';
import { useNavigate, Link } from 'react-router-dom';
// Optionally: import and dispatch Redux auth state here
// import { useDispatch } from 'react-redux';
// import { setUser } from '../../redux/authSlice';

/**
 * To configure:
 * 1. Set up Firebase project (see assistant message for detailed steps).
 * 2. Enable Authentication (Email/Password) in your Firebase Console.
 * 3. Copy your firebaseConfig values into src/firebase/config.js
 */

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  // const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      // Optionally save to Redux:  dispatch(setUser(result.user));
      setLoading(false);
      navigate('/'); // Redirect to homepage/dashboard after login
    } catch (err) {
      setLoading(false);
      setError(err.message);
    }
  };

  return (
    <Box maxWidth={360} mx="auto" my={8} p={4} borderRadius={2} boxShadow={2} bgcolor="background.paper">
      <Typography variant="h5" mb={2}>Login to SIMS</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Email"
          type="email"
          fullWidth
          required
          margin="normal"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <TextField
          label="Password"
          type="password"
          fullWidth
          required
          margin="normal"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        {error && <Alert severity="error" sx={{ mt: 1 }}>{error}</Alert>}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} /> : 'Login'}
        </Button>
        <Typography mt={2} textAlign="center">
          Don't have an account?{' '}
          <Button component={Link} to="/register" size="small">Register</Button>
        </Typography>
      </form>
    </Box>
  );
};

export default Login;
