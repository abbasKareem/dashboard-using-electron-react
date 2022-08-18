import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import companiesService from './companiesService';

const initialState = {
  companies: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

// Create new city
export const createCompany = createAsyncThunk(
  'companies/create',
  async (companyData, thunkAPI) => {
    try {
      console.log(companyData);
      return await companiesService.createCompany(companyData);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get all companies
export const getCompanies = createAsyncThunk(
  'companies/getAll',
  async (_, thunkAPI) => {
    try {
      return await companiesService.getCompanies();
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Delete City
export const deleteCompany = createAsyncThunk(
  'companies/delete',
  async (id, thunkAPI) => {
    try {
      console.log(id);
      return await companiesService.deleteCompany(id);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const compainesSlice = createSlice({
  name: 'companies',
  initialState: initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createCompany.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createCompany.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.companies.push(action.payload);
      })
      .addCase(createCompany.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload.error;
      })
      .addCase(getCompanies.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCompanies.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.companies = action.payload;
      })
      .addCase(getCompanies.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload.error;
      })
      .addCase(deleteCompany.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteCompany.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.companies = state.companies.filter(
          (city) => city.id !== action.payload.id
        );
      })
      .addCase(deleteCompany.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload.error;
      });
  },
});

export const { reset } = compainesSlice.actions;
export default compainesSlice.reducer;
