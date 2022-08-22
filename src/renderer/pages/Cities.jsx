import {
  Button,
  Center,
  createStyles,
  Grid,
  Loader,
  Paper,
  SimpleGrid,
} from '@mantine/core';
import React from 'react';
import CityForm from 'renderer/components/CityForm';
import CityItem from 'renderer/components/CityItem';
import { getCities } from 'renderer/query/query';
import { useNavigate } from 'react-router-dom';

const useStyles = createStyles((theme) => ({
  Card: {
    borderRadius: '20px',
    backgroundColor:
      theme.colorScheme === 'dark'
        ? theme.colors.gray[9]
        : theme.colors.gray[0],
    width: '285px',
    marginTop: '10px',
    marginBottom: '10px',
    color: 'black',
    transition: 'box-shadow 150ms ease, transform 100ms ease',
    '&:hover': {
      boxShadow: `${theme.shadows.md} !important`,
      transform: 'scale(1.05)',
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.colors.gray[8]
          : theme.colors.gray[2],
      cursor: 'pointer',
    },
  },
  centerGrid: {
    width: '100%',
    marginTop: '30px',
  },
  errorMessage: {
    color: 'red',
  },
}));

const Cities = () => {
  const navigate = useNavigate();
  const { classes } = useStyles();

  const { data, isError, isLoading } = getCities();

  return (
    <>
      <Paper sx={{ marginBottom: '20px' }}>
        <CityForm />
      </Paper>
      <Paper sx={{ marginBottom: '20px' }}>
        <Center>
          <h1>
            The Total Cityes:{' '}
            <span style={{ color: 'green' }}>{data?.length}</span>{' '}
          </h1>
        </Center>
      </Paper>
      <Paper>
        {isLoading ? (
          <Center>
            <Loader size="xl" />
          </Center>
        ) : isError ? (
          <Center
            sx={{
              display: 'flex',
              justifyItems: 'center',
              flexDirection: 'column',
            }}
          >
            <h1 className={classes.errorMessage}>
              Opps, Something went wrong..
            </h1>
            <Button onClick={() => navigate('/cities')} variant="outline">
              Try Again
            </Button>
          </Center>
        ) : (
          <Center className={classes.centerGrid}>
            <SimpleGrid cols={3} spacing="lg">
              {data.map((city) => (
                <div key={city.id} className={classes.Card}>
                  <CityItem
                    cityId={city.id}
                    cityName={city.name}
                    cityCensus={city.census}
                    cityCode={city.city_code}
                  />
                </div>
              ))}
            </SimpleGrid>
          </Center>
        )}
      </Paper>
    </>
  );
};

export default Cities;
