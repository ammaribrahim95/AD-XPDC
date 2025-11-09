import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ theme, toggleTheme, user, onLogout, onMenuClick }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const navigate = useNavigate();
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = () => {
    handleClose();
    if (onLogout) onLogout();
  };

  return (
    <AppBar position="fixed" color="primary" elevation={2}>
      <Toolbar>
        <IconButton
          color="inherit"
          edge="start"
          sx={{ mr: 2, display: { xs: 'inline-flex', sm: 'inline-flex' } }}
          aria-label="open drawer"
          onClick={onMenuClick}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          SIMS - Store Inventory Management System
        </Typography>
        <IconButton color="inherit" onClick={toggleTheme} size="large">
          {theme === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>
        <Box sx={{ ml: 2 }}>
          <IconButton color="inherit" size="large" onClick={handleMenu}>
            <AccountCircle />
          </IconButton>
          <Menu anchorEl={anchorEl} open={!!anchorEl} onClose={handleClose}>
            {!user ? (
              [
                <MenuItem key="login" onClick={() => { handleClose(); navigate('/login'); }}>Login</MenuItem>,
                <MenuItem key="register" onClick={() => { handleClose(); navigate('/register'); }}>Register</MenuItem>
              ]
            ) : (
              [
                <MenuItem key="email" disabled>{user.email || 'Not logged in'}</MenuItem>,
                <MenuItem key="logout" onClick={handleLogout}>Logout</MenuItem>
              ]
            )}
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
