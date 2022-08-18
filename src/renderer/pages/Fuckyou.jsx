import { Image, Paper } from '@mantine/core';
import axios from 'axios';
import React from 'react';
import { useQuery } from 'react-query';
import { toast } from 'react-toastify';

const Fuckyou = () => {
  const getCities = async () => {
    const res = await axios.get('https://app0989.herokuapp.com/api/v1/company');
    return res.data;
  };
  const { isError, isLoading, data, isSuccess } = useQuery(
    'cities',
    getCities,
    {
      onSuccess: () => {
        toast.success('success');
      },
      onError: (error) => {
        toast.error('Error from the server');
      },
    }
  );
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Erorr...</div>;
  }

  console.log(isSuccess);
  return (
    <Paper>
      {data.map((company) => (
        <div key={company.id}>
          <h1>{company.name}</h1>
          <p>{company.manger_name}</p>
        </div>
      ))}
    </Paper>
  );
};

export default Fuckyou;
