import { createSlice } from '@reduxjs/toolkit';
const initialState = { suppliers: [], status: 'idle', error: null };
const supplierSlice = createSlice({
  name: 'suppliers',
  initialState,
  reducers: {
    setSuppliers(state, action) { state.suppliers = action.payload; },
  },
});
export const { setSuppliers } = supplierSlice.actions;
export default supplierSlice.reducer;
