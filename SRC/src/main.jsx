import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const darkTheme = createTheme({
  palette: { mode: 'light' }, // Toggle to 'dark' for dark mode!
});

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
