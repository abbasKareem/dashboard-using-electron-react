import { Loader, Paper } from '@mantine/core';
import React from 'react';

const Spinner = () => {
  return (
    <div
      style={{
        marginTop: '200px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Loader size={100} />
    </div>
  );
};

export default Spinner;
