import React, { useState, useEffect } from 'react';
import { db } from '../../firebase/config';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, setDoc } from 'firebase/firestore';
import { Roles } from '../../utils/roles';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import Snackbar from '@mui/material/Snackbar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';

const defaultForm = {
  groupId: '',
  groupName: '',
  description: '',
  department: '',
  permissions: {
    inventory: false,
    procurement: false,
    maintenance: false,
    admin: false,
    canAccessUserManagement: false,
    canAccessPartMaster: false,
    canAccessAssetRegistry: false,
    canAccessStorageLocations: false,
    canAccessSupplierManagement: false,
    canAccessReports: false
  }
};

// Convert Roles to array for predefined groups
const predefinedGroups = Object.values(Roles).map(role => ({
  groupId: role.groupId,
  groupName: role.name,
  description: getGroupDescription(role.name),
  permissions: role.permissions
}));

function getGroupDescription(roleName) {
  switch (roleName) {
    case 'Admin':
      return 'Administrator group with full access';
    case 'Store keeper':
      return 'Manages inventory and stock';
    case 'Maintenance Technician':
      return 'Handles maintenance requests';
    case 'Procurement Officer':
      return 'Manages purchases and orders';
    default:
      return '';
  }
}

const UserGroupMaster = () => {
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState({ open: false, edit: false, data: defaultForm });
  const [snackbar, setSnackbar] = useState({ open: false, msg: '', severity: 'success' });

  // Fetch groups from Firestore 'groups' collection
  const fetchGroups = async () => {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, 'groups'));
      const groupsData = querySnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          ...data,
          id: doc.id,
          groupId: data.groupId || doc.id,
          groupName: data.name || data.groupName || doc.id || '',
          description: data.description || '',
          department: data.department || '',
        };
      });
      setGroups(groupsData);
    } catch (err) {
      setSnackbar({ open: true, msg: 'Failed to fetch groups', severity: 'error' });
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => { fetchGroups(); }, []);

  const openAdd = () => setModal({ open: true, edit: false, data: defaultForm });
  const openEdit = (row) => {
    setModal({ 
      open: true, 
      edit: true, 
      data: {
        ...row,
        groupName: row.groupName || row.name || row.groupId,
      }
    });
  };
  const closeModal = () => setModal({ open: false, edit: false, data: defaultForm });

  const handleSave = async () => {
    const { groupId, groupName, description, department, id } = modal.data;
    if (!groupId || !groupName) return setSnackbar({ open: true, msg: 'Group ID and Name required!', severity: 'error' });
    try {
      if (modal.edit) {
        // Use groupId as document ID for consistency
        await setDoc(doc(db, 'groups', id), { 
          groupId, 
          name: groupName,
          groupName,
          description, 
          department,
          updatedAt: new Date().toISOString(),
        }, { merge: true });
        setSnackbar({ open: true, msg: 'Group updated.', severity: 'success' });
      } else {
        // Use groupId as document ID
        await setDoc(doc(db, 'groups', groupId), { 
          groupId, 
          name: groupName,
          groupName,
          description, 
          department,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }, { merge: true });
        setSnackbar({ open: true, msg: 'Group added.', severity: 'success' });
      }
      closeModal();
      fetchGroups();
    } catch (err) {
      setSnackbar({ open: true, msg: 'Save failed: ' + err.message, severity: 'error' });
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete group?')) return;
    try {
      await deleteDoc(doc(db, 'groups', id));
      setGroups(groups => groups.filter(g => g.id !== id));
      setSnackbar({ open: true, msg: 'Group deleted.', severity: 'success' });
    } catch {
      setSnackbar({ open: true, msg: 'Delete failed', severity: 'error' });
    }
  };

  const columns = [
    { field: 'groupId', headerName: 'Group ID', width: 110 },
    { field: 'groupName', headerName: 'Group Name', width: 160 },
    { field: 'description', headerName: 'Description', flex: 1 },
    { field: 'department', headerName: 'Department', width: 150 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 120,
      renderCell: ({ row }) => (
        <>
          <IconButton size="small" onClick={() => openEdit(row)}><EditIcon /></IconButton>
          <IconButton size="small" color="error" onClick={() => handleDelete(row.id)}><DeleteIcon /></IconButton>
        </>
      ),
      sortable: false
    },
  ];

  return (
    <Box sx={{ maxWidth: 900, mx: 'auto', mt: 4, p: 3, bgcolor: 'background.paper', borderRadius: 2, boxShadow: 2 }}>
      <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
        <Typography variant="h5">User Group Master</Typography>
        <Button variant="contained" onClick={openAdd}>Add Group</Button>
      </Box>
      <div style={{ height: 420, width: '100%' }}>
        {loading ? (
          <Box display="flex" alignItems="center" justifyContent="center" height={260}>
            <CircularProgress />
          </Box>
        ) : (
          <DataGrid 
            rows={groups || []} 
            columns={columns} 
            autoHeight 
            pageSize={8} 
            disableSelectionOnClick 
          />
        )}
      </div>
      {/* Add/Edit Modal */}
      <Dialog open={modal.open} onClose={closeModal}>
        <DialogTitle>{modal.edit ? 'Edit Group' : 'Add Group'}</DialogTitle>
        <DialogContent>
          <TextField
            margin="normal"
            label="Group ID"
            value={modal.data.groupId}
            onChange={e => setModal(m => ({ ...m, data: { ...m.data, groupId: e.target.value } }))}
            fullWidth
            disabled={modal.edit}
          />
          <TextField
            margin="normal"
            label="Group Name"
            value={modal.data.groupName}
            onChange={e => setModal(m => ({ ...m, data: { ...m.data, groupName: e.target.value } }))}
            fullWidth
          />
          <TextField
            margin="normal"
            label="Description"
            value={modal.data.description}
            onChange={e => setModal(m => ({ ...m, data: { ...m.data, description: e.target.value } }))}
            fullWidth
            multiline
          />
          <TextField
            margin="normal"
            label="Department"
            value={modal.data.department}
            onChange={e => setModal(m => ({ ...m, data: { ...m.data, department: e.target.value } }))}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeModal}>Cancel</Button>
          <Button variant="contained" onClick={handleSave}>{modal.edit ? 'Update' : 'Add'}</Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={2600}
        message={snackbar.msg}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      />
    </Box>
  );
};

export default UserGroupMaster;
