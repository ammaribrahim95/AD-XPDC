import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  parts: [],
  status: 'idle',
  error: null,
};

const partsSlice = createSlice({
  name: 'parts',
  initialState,
  reducers: {
    setParts(state, action) {
      state.parts = action.payload;
    },
    addPart(state, action) {
      state.parts.push(action.payload);
    },
    updatePart(state, action) {
      const idx = state.parts.findIndex((p) => p.id === action.payload.id);
      if (idx !== -1) state.parts[idx] = action.payload;
    },
    deletePart(state, action) {
      state.parts = state.parts.filter((p) => p.id !== action.payload);
    },
  },
});

export const { setParts, addPart, updatePart, deletePart } = partsSlice.actions;
export default partsSlice.reducer;
