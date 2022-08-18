import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import citiesService from './citiesService';

const initialState = {
  all_cities: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

// Create new city
export const createCity = createAsyncThunk(
  'cities/create',
  async (cityData, thunkAPI) => {
    try {
      console.log(cityData);
      return await citiesService.createCity(cityData);
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

// Get Cities
export const getCities = createAsyncThunk(
  'cities/getAll',
  async (_, thunkAPI) => {
    try {
      return await citiesService.getCities();
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
export const deleteCity = createAsyncThunk(
  'cities/delete',
  async (id, thunkAPI) => {
    try {
      console.log(id);
      return await citiesService.deleteCity(id);
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

export const citiesSlice = createSlice({
  name: 'cities',
  initialState: initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createCity.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createCity.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.all_cities.push(action.payload);
      })
      .addCase(createCity.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload.error;
      })
      .addCase(getCities.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCities.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.all_cities = action.payload;
      })
      .addCase(getCities.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload.error;
      })
      .addCase(deleteCity.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteCity.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.all_cities = state.all_cities.filter(
          (city) => city.id !== action.payload.id
        );
      })
      .addCase(deleteCity.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload.error;
      });
  },
});

export const { reset } = citiesSlice.actions;
export default citiesSlice.reducer;
