import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import api from '../../services/api';

const initialState = {
  notes: [],
  loading: false,
  error: null,
};

export const fetchNotes = createAsyncThunk(
  'note/fetchNotes',
  async ({searchText}) => {
    console.log('searchText: ', searchText);

    let endpoint = '/notes/getAll';

    if (searchText && searchText.trim()) {
      endpoint = `/notes/getAll?search=${encodeURIComponent(
        searchText.trim(),
      )}`;
    }

    try {
      const response = await api.get(endpoint);
      return response.data;
    } catch (error) {
      console.log('Error in (/notes/getAll): ', error);
      throw error;
    }
  },
);

const noteSlice = createSlice({
  name: 'note',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchNotes.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNotes.fulfilled, (state, action) => {
        state.loading = false;
        state.notes = action.payload;
      })
      .addCase(fetchNotes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default noteSlice.reducer;
