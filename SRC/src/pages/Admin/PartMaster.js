import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { db } from '../../firebase/config';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { setParts, addPart, updatePart, deletePart } from '../../redux/partsSlice';
import DataTable from '../../components/DataTable';
import ModalForm from '../../components/ModalForm';
import UploadFile from '../../components/UploadFile';
// import Barcode from 'react-barcode'; // Uncomment if you have this lib
import { Button, Snackbar, TextField } from '@mui/material';

// Main Part Master Page
const PartMaster = () => {
  const dispatch = useDispatch();
  const parts = useSelector((state) => state.parts.parts);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editPart, setEditPart] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  // Sample fields for a Part
  const [form, setForm] = useState({ sapNumber: '', name: '', category: '', location: '' });

  // Fetch parts from Firestore
  useEffect(() => {
    const fetchParts = async () => {
      setLoading(true);
      try {
        const querySnapshot = await getDocs(collection(db, 'parts'));
        const data = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
        dispatch(setParts(data));
      } catch (error) {
        setSnackbar({ open: true, message: 'Fetch error', severity: 'error' });
      } finally {
        setLoading(false);
      }
    };
    fetchParts();
  }, [dispatch]);

  // Handle modal open for add/edit
  const handleOpenModal = (part = null) => {
    setEditPart(part);
    setForm(part || { sapNumber: '', name: '', category: '', location: '' });
    setModalOpen(true);
  };
  const handleCloseModal = () => {
    setEditPart(null);
    setModalOpen(false);
  };

  // Save (Create/Update) part
  const handleSave = async () => {
    if (!form.sapNumber) return setSnackbar({ open: true, message: 'SAP # required', severity: 'error' });
    try {
      if (editPart) {
        await updateDoc(doc(db, 'parts', editPart.id), form);
        dispatch(updatePart({ ...form, id: editPart.id }));
        setSnackbar({ open: true, message: 'Updated!', severity: 'success' });
      } else {
        const docRef = await addDoc(collection(db, 'parts'), form);
        dispatch(addPart({ ...form, id: docRef.id }));
        setSnackbar({ open: true, message: 'Created!', severity: 'success' });
      }
      handleCloseModal();
    } catch (e) {
      setSnackbar({ open: true, message: 'Save failed', severity: 'error' });
    }
  };
  // Delete part
  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, 'parts', id));
      dispatch(deletePart(id));
      setSnackbar({ open: true, message: 'Deleted', severity: 'success' });
    } catch (e) {
      setSnackbar({ open: true, message: 'Delete failed', severity: 'error' });
    }
  };
  // Columns for DataTable (Material UI DataGrid)
  const columns = [
    { field: 'sapNumber', headerName: 'SAP #', width: 110 },
    { field: 'name', headerName: 'Name', flex: 1 },
    { field: 'category', headerName: 'Category', width: 130 },
    { field: 'location', headerName: 'Location', width: 120 },
    {
      field: 'barcode',
      headerName: 'Barcode',
      width: 130,
      renderCell: ({ row }) => (
        <div>{/* <Barcode value={row.sapNumber || ''} width={1} height={30} /> */}BARCODE</div>
      ),
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 170,
      renderCell: ({ row }) => (
        <>
          <Button size="small" onClick={() => handleOpenModal(row)}>Edit</Button>
          <Button size="small" color="error" onClick={() => handleDelete(row.id)}>Delete</Button>
        </>
      ),
      sortable: false
    },
  ];

  return (
    <div>
      <h2>Part Master</h2>
      <Button onClick={() => handleOpenModal()} variant="contained" sx={{ mb: 2 }}>Add Part</Button>
      <DataTable rows={parts} columns={columns} loading={loading} />
      {modalOpen && (
        <ModalForm open={modalOpen} onClose={handleCloseModal}>
          <h3>{editPart ? 'Edit' : 'Add'} Part</h3>
          <form style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <TextField label="SAP #" value={form.sapNumber} onChange={e => setForm(f => ({ ...f, sapNumber: e.target.value }))} required />
            <TextField label="Name" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
            <TextField label="Category" value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))} />
            <TextField label="Location" value={form.location} onChange={e => setForm(f => ({ ...f, location: e.target.value }))} />
            <UploadFile />
            <div style={{ marginTop: 8 }}>
              <Button variant="contained" onClick={handleSave}>{editPart ? 'Update' : 'Create'}</Button>
              <Button onClick={handleCloseModal} sx={{ ml: 1 }}>Cancel</Button>
            </div>
          </form>
        </ModalForm>
      )}
      <Snackbar open={snackbar.open} autoHideDuration={3000} onClose={() => setSnackbar(s => ({ ...s, open: false }))} message={snackbar.message} />
    </div>
  );
};

export default PartMaster;
