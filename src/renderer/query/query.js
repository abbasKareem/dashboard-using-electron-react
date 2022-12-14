import axios from 'axios';
import { useQueries, useQuery } from 'react-query';

// =======================COMPANY CRUD==============
export const getCompanies = () =>
  useQuery(
    'companies',
    async () => {
      const res = await axios.get(
        'https://app0989.herokuapp.com/api/v1/company'
      );
      return res.data;
    },
    { refetchOnReconnect: false, retry: false }
  );

export const deleteCompany = async (id) => {
  const res = await axios.delete(
    `https://app0989.herokuapp.com/api/v1/company/delete/${id}`
  );
  return res.data;
};

export const updateCompany = async (data) => {
  const res = await axios.put(
    'https://app0989.herokuapp.com/api/v1/company',
    data,
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
  return res.data;
};

export const addCompany = async (data) => {
  const res = await axios.post(
    'https://app0989.herokuapp.com/api/v1/company',
    data,
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
  return res.data;
};
// =======================END COMPANY CRUD==============

// =======================CITY CRUD==============
export const getCities = () =>
  useQuery(
    'cities',
    async () => {
      const res = await axios.get('https://app0989.herokuapp.com/api/v1/citys');
      return res.data;
    },
    {
      refetchOnReconnect: false,
      retry: false,
    }
  );

export const deleteCity = async (id) => {
  const res = await axios.delete(
    `https://app0989.herokuapp.com/api/v1/citys/${id}`
  );
  return res.data;
};

export const updateCity = async (data) => {
  const res = await axios.post(
    'https://app0989.herokuapp.com/api/v1/citys',
    data,
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
  return res.data;
};
export const addCity = async (data) => {
  const res = await axios.post(
    'https://app0989.herokuapp.com/api/v1/citys',
    data,
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
  return res.data;
};

// =======================END CITY CRUD==============

// =======================DELEGATES CRUD==============
export const getDelegates = () =>
  useQuery(
    'delegates',
    async () => {
      const res = await axios.get(
        'https://app0989.herokuapp.com/api/v1/delegates'
      );
      return res.data;
    },
    { retry: false, refetchOnReconnect: false }
  );

export const deleteDelegate = async (id) => {
  const res = await axios.delete(
    `https://app0989.herokuapp.com/api/v1/delegates/delete/${id}`
  );
  return res.data;
};

export const updateDelegate = async (data) => {
  const res = await axios.post(
    'https://app0989.herokuapp.com/api/v1/delegates',
    data,
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
  return res.data;
};
export const addDelegate = async (data) => {
  const res = await axios.post(
    'https://app0989.herokuapp.com/api/v1/delegates',
    data,
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
  return res.data;
};

// =======================END DELEGATES CRUD==============
