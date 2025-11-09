import React, { useState } from 'react';
import { TextField, Button, Typography, Box, Alert, CircularProgress } from '@mui/material';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase/config';
import { useNavigate, Link } from 'react-router-dom';
// Optionally: import Redux and dispatch setUser if you'd like to store logged in user

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setLoading(false);
      navigate('/'); // Redirect after registration
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <Box maxWidth={360} mx="auto" my={8} p={4} borderRadius={2} boxShadow={2} bgcolor="background.paper">
      <Typography variant="h5" mb={2}>Register</Typography>
      <form onSubmit={handleRegister}>
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
          {loading ? <CircularProgress size={24} /> : 'Register'}
        </Button>
        <Typography mt={2} textAlign="center">
          Already have an account?{' '}
          <Button component={Link} to="/login" size="small">Login</Button>
        </Typography>
      </form>
    </Box>
  );
};

export default Register;
