import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { db, auth } from "../../firebase/config";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  setDoc,
} from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { DataGrid } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Snackbar from "@mui/material/Snackbar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";

const defaultForm = {
  email: "",
  username: "",
  password: "",
  department: "",
  groupId: "",
  status: "pending", // pending, active, inactive
};

const UserManagement = () => {
  const currentUser = useSelector((state) => state.auth.user);
  const isAdmin = currentUser?.groupId === "A";
  const [users, setUsers] = useState([]);
  const [userGroups, setUserGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState({
    open: false,
    edit: false,
    data: defaultForm,
  });
  const [snackbar, setSnackbar] = useState({
    open: false,
    msg: "",
    severity: "success",
  });

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, "users"));
      setUsers(
        querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
    } catch (err) {
      setSnackbar({
        open: true,
        msg: "Failed to fetch users",
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };
  // Always fetch groups from 'groups' collection
  const fetchUserGroups = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "groups"));
      const groups = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          groupId: data.groupId || doc.id,
          groupName: data.name || data.groupName || doc.id,
          ...data,
        };
      });
      setUserGroups(groups);
    } catch (err) {
      console.error("Failed to fetch user groups:", err);
      setUserGroups([]);
    }
  };
  useEffect(() => {
    fetchUsers();
    fetchUserGroups();
  }, []);

  const openAdd = () =>
    setModal({ open: true, edit: false, data: defaultForm });
  const openEdit = (row) => {
    console.log("Edit row:", row);
    setModal({
      open: true,
      edit: true,
      data: {
        ...row,
        password: "",
        groupId: row.groupId || "",
      },
    });
  };
  const closeModal = () =>
    setModal({ open: false, edit: false, data: defaultForm });

  // Add/Edit user doc
  const handleSave = async () => {
    const { email, username, password, department, groupId, id } = modal.data;
    console.log("Save user - groupId:", groupId, "isAdmin:", isAdmin);
    if (!email || !username || !department || !groupId) {
      setSnackbar({
        open: true,
        msg: "Fill all fields except password (which is only for create)",
        severity: "error",
      });
      return;
    }
    if (!isAdmin) {
      setSnackbar({
        open: true,
        msg: "Only admins can add or edit users",
        severity: "error",
      });
      return;
    }
    try {
      if (modal.edit) {
        await setDoc(doc(db, "users", id), {
          email,
          username,
          department,
          groupId,
          status: modal.data.status || "active",
        });
        setSnackbar({ open: true, msg: "User updated.", severity: "success" });
      } else {
        // On create: create user in Firebase Auth, then add document
        if (!password)
          return setSnackbar({
            open: true,
            msg: "Password is required for new user",
            severity: "error",
          });
        const cred = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        await setDoc(doc(db, "users", cred.user.uid), {
          email,
          username,
          department,
          groupId,
          uid: cred.user.uid,
          status: "active",
          createdAt: new Date().toISOString(),
        });
        setSnackbar({ open: true, msg: "User added.", severity: "success" });
      }
      closeModal();
      fetchUsers();
    } catch (err) {
      setSnackbar({
        open: true,
        msg: "Save failed: " + err.message,
        severity: "error",
      });
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete user?")) return;
    try {
      await deleteDoc(doc(db, "users", id));
      setUsers((users) => users.filter((u) => u.id !== id));
      setSnackbar({ open: true, msg: "User deleted.", severity: "success" });
    } catch {
      setSnackbar({ open: true, msg: "Delete failed", severity: "error" });
    }
  };

  const columns = [
    { field: "email", headerName: "Email", flex: 1 },
    { field: "username", headerName: "Username", flex: 0.7 },
    { field: "department", headerName: "Department", width: 140 },
    {
      field: "groupId",
      headerName: "Group",
      width: 180,
      renderCell: ({ row }) =>
        userGroups.find((g) => g.groupId === row.groupId)?.groupName ||
        row.groupId,
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 130,
      renderCell: ({ row }) => (
        <>
          <IconButton size="small" onClick={() => openEdit(row)}>
            <EditIcon />
          </IconButton>
          <IconButton
            size="small"
            color="error"
            onClick={() => handleDelete(row.id)}
          >
            <DeleteIcon />
          </IconButton>
        </>
      ),
      sortable: false,
    },
  ];

  return (
    <Box
      sx={{
        maxWidth: 950,
        mx: "auto",
        mt: 4,
        p: 3,
        bgcolor: "background.paper",
        borderRadius: 2,
        boxShadow: 2,
      }}
    >
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        mb={2}
      >
        <Typography variant="h5">User Master</Typography>
        {isAdmin && (
          <Button variant="contained" onClick={openAdd}>
            Add User
          </Button>
        )}
      </Box>
      <div style={{ height: 520, width: "100%" }}>
        {loading ? (
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            height={300}
          >
            <CircularProgress />
          </Box>
        ) : (
          <DataGrid
            rows={users}
            columns={columns}
            autoHeight
            pageSize={8}
            disableSelectionOnClick
          />
        )}
      </div>
      {/* Add/Edit Modal */}
      <Dialog open={modal.open} onClose={closeModal} maxWidth="sm" fullWidth>
        <DialogTitle>{modal.edit ? "Edit User" : "Add User"}</DialogTitle>
        <DialogContent sx={{ minHeight: "400px", overflow: "auto" }}>
          <TextField
            margin="normal"
            label="Email"
            type="email"
            value={modal.data.email}
            onChange={(e) =>
              setModal((m) => ({
                ...m,
                data: { ...m.data, email: e.target.value },
              }))
            }
            fullWidth
            disabled={modal.edit}
          />
          <TextField
            margin="normal"
            label="Username"
            value={modal.data.username}
            onChange={(e) =>
              setModal((m) => ({
                ...m,
                data: { ...m.data, username: e.target.value },
              }))
            }
            fullWidth
          />
          <TextField
            margin="normal"
            label="Department"
            value={modal.data.department}
            onChange={(e) =>
              setModal((m) => ({
                ...m,
                data: { ...m.data, department: e.target.value },
              }))
            }
            fullWidth
          />
          {!modal.edit && (
            <TextField
              margin="normal"
              label="Password"
              type="password"
              value={modal.data.password}
              onChange={(e) =>
                setModal((m) => ({
                  ...m,
                  data: { ...m.data, password: e.target.value },
                }))
              }
              fullWidth
            />
          )}
          <FormControl margin="normal" fullWidth sx={{ mt: 2 }}>
            <InputLabel id="group-select-label">User Group</InputLabel>
            <Select
              labelId="group-select-label"
              id="group-select"
              label="User Group"
              value={modal.data.groupId || ""}
              onChange={(e) => {
                setModal((m) => ({
                  ...m,
                  data: { ...m.data, groupId: e.target.value },
                }));
              }}
              disabled={!isAdmin}
            >
              <MenuItem value="">
                <em>Select a group</em>
              </MenuItem>
              {userGroups && userGroups.length > 0 ? (
                userGroups.map((g) => (
                  <MenuItem key={g.groupId || g.id} value={g.groupId || g.id}>
                    {g.groupName || g.name || g.id}
                  </MenuItem>
                ))
              ) : (
                <MenuItem disabled>No groups available</MenuItem>
              )}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={closeModal}>Cancel</Button>
          <Button 
            variant="contained" 
            color="primary" 
            onClick={handleSave}
            disabled={!isAdmin}
          >
            {modal.edit ? "Save" : "Add"}
          </Button>
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

export default UserManagement;
