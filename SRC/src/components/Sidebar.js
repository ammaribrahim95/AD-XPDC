import React, { useState } from 'react';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import DashboardIcon from '@mui/icons-material/Dashboard';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import SettingsIcon from '@mui/icons-material/Settings';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import GroupIcon from '@mui/icons-material/Group';
import StorageIcon from '@mui/icons-material/Storage';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import BuildIcon from '@mui/icons-material/Build';
import PeopleIcon from '@mui/icons-material/People';
import Box from '@mui/material/Box';
import { NavLink, useLocation } from 'react-router-dom';
import Collapse from '@mui/material/Collapse';

const drawerWidth = 220;
const collapsedWidth = 64;

const dataInputMasterLinks = [
  { path: '/admin/user-master', text: 'User Master', icon: <PeopleIcon /> },
  { path: '/admin/user-group-master', text: 'User Group Master', icon: <GroupIcon /> },
  { path: '/admin/part-master', text: 'Part Master', icon: <Inventory2Icon /> },
  { path: '/admin/part-group-master', text: 'Part Group Master', icon: <GroupIcon /> },
  { path: '/admin/bin-master', text: 'Bin Master', icon: <StorageIcon /> },
  { path: '/admin/customer-master', text: 'Customer Master', icon: <AccountCircleIcon /> },
  { path: '/admin/supplier-master', text: 'Supplier Master', icon: <GroupIcon /> },
  { path: '/admin/machine-master', text: 'Machine Master', icon: <BuildIcon /> },
];

const reportLinks = [
  { path: '/reports/dashboard-kpis', text: 'Dashboard', icon: <DashboardIcon /> },
  { path: '/reports/traceability-report', text: 'Traceability Report', icon: <DashboardIcon /> },
  { path: '/reports/stock-valuation', text: 'Stock Valuation', icon: <DashboardIcon /> },
  { path: '/reports/stock-movement', text: 'Stock Movement', icon: <DashboardIcon /> },
  { path: '/reports/low-stock', text: 'Low Stock', icon: <DashboardIcon /> },
];

const Sidebar = ({ open, onToggle }) => {
  const location = useLocation();
  const [dataMasterOpen, setDataMasterOpen] = useState(true);
  const toggleDataMaster = () => setDataMasterOpen((prev) => !prev);
  return (
    <Drawer
      variant="persistent"
      open={open}
      sx={{
        width: open ? drawerWidth : collapsedWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        [`& .MuiDrawer-paper`]: {
          width: open ? drawerWidth : collapsedWidth,
          boxSizing: 'border-box',
          overflowX: 'hidden',
          transition: 'width 0.2s',
        },
      }}
    >
      <List sx={{ mt: 1, mb: 1, display: 'flex', flexDirection: 'row', justifyContent: open ? 'flex-end' : 'center' }}>
        <IconButton onClick={onToggle}>{open ? <ChevronLeftIcon /> : <ChevronRightIcon />}</IconButton>
      </List>
      <Divider />
      {/* Data Input Master with expandable menu */}
      <List>
        <ListItem button onClick={toggleDataMaster} sx={{ justifyContent: open ? 'initial' : 'center', px: open ? 2 : 0 }}>
          <ListItemIcon sx={{ minWidth: 0, mr: open ? 2 : 'auto', justifyContent: 'center' }}>
            <SettingsIcon />
          </ListItemIcon>
          {open && (
            <>
              <ListItemText primary="Data Input Master" sx={{}} />
              <Box sx={{ ml: 'auto', pl: 1, display: 'flex', alignItems: 'center' }}>
                {dataMasterOpen ? <ExpandLess /> : <ExpandMore />}
              </Box>
            </>
          )}
        </ListItem>
        <Collapse in={dataMasterOpen && open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {dataInputMasterLinks.map((item) => (
              <ListItem
                button
                key={item.path}
                component={NavLink}
                to={item.path}
                selected={location.pathname === item.path}
                sx={{
                  pl: open ? 6 : 2,
                  justifyContent: open ? 'initial' : 'center',
                  minHeight: 40
                }}
              >
                <ListItemIcon sx={{ minWidth: 0, mr: open ? 2 : 'auto', justifyContent: 'center' }}>{item.icon}</ListItemIcon>
                {open && <ListItemText primary={item.text} />}
              </ListItem>
            ))}
          </List>
        </Collapse>
        <Divider sx={{ mt: 1 }} />
        {/* Reports section as before */}
        {open ? (
          <Typography variant="subtitle2" sx={{ px: 2, pt: 2, color: 'primary.main' }}>Reports</Typography>
        ) : null}
        {reportLinks.map((item) => (
          <ListItem
            key={item.path}
            button
            component={NavLink}
            to={item.path}
            selected={location.pathname === item.path}
            sx={{
              justifyContent: open ? 'initial' : 'center',
              px: open ? 2 : 0,
              minHeight: 48
            }}
          >
            <ListItemIcon sx={{ minWidth: 0, mr: open ? 2 : 'auto', justifyContent: 'center' }}>{item.icon}</ListItemIcon>
            {open && <ListItemText primary={item.text} />}
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
