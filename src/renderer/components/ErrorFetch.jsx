import React from 'react';
import { Button, Center, createStyles, Paper } from '@mantine/core';
import { IconMoodSad } from '@tabler/icons';
import Shit from './Shit';
import { useNavigate } from 'react-router-dom';

const useStyles = createStyles((theme) => ({
  heading: {
    color: 'red',
  },
}));
const ErrorFetch = () => {
  const { classes } = useStyles();
  const navigate = useNavigate();
  return (
    <Paper>
      <Center sx={{ display: 'flex', flexDirection: 'column' }}>
        <h1 className={classes.heading}>
          Ooops,
          <IconMoodSad size="50px" /> Something went wrong..
        </h1>
        <h2>An Error occures while fetching the data.</h2>
        <h3>Please check your internet connection</h3>
        <p>
          If you are connected to the internet, then maybe there is an error
          from the server...
        </p>
        <Button
          onClick={() => navigate('/')}
          variant="outline"
          style={{ margin: '20px' }}
        >
          Home Page
        </Button>
      </Center>
    </Paper>
  );
};

export default ErrorFetch;
