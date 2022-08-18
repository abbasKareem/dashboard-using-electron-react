import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/auth/authSlice';
import citiesReducer from './features/cities/citiesSlice';
import companiesReducer from './features/companies/companiesSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cities: citiesReducer,
    companies: companiesReducer,
  },
});
