import {
  Center,
  Container,
  createStyles,
  Image,
  Paper,
  Text,
  Grid,
  Box,
  Group,
  Tooltip,
  Loader,
} from '@mantine/core';
import axios from 'axios';
import React from 'react';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getCities, getCompanies, getDelegates } from 'renderer/query/query';

const useStyles = createStyles((theme) => ({
  header: {
    color:
      theme.colorScheme === 'dark'
        ? theme.colors.grape[5]
        : theme.colors.pink[6],
    fontSize: '50px',
    fontFamily: 'fantasy',
    marginBottom: '20px',
    letterSpacing: 2,
  },
  card: {
    minHeight: 200,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '1px solid pink',
    backgroundColor:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[7]
        : theme.colors.gray[2],
  },
  innerCard: {
    transition: 'box-shadow 150ms ease, transform 100ms ease',
    '&:hover': {
      boxShadow: `${theme.shadows.md} !important`,
      transform: 'scale(1.05)  rotate(2deg)',

      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.colors.gray[8]
          : theme.colors.gray[2],
      cursor: 'pointer',
    },
    height: '178px',
    width: '385px',
    backgroundColor:
      theme.colorScheme === 'dark' ? theme.colors.dark[6] : '#FFFFFF',
    borderRadius: '15px',
  },

  paperCards: {
    minHeight: '45vh',
    paddingTop: '20px',
    backgroundColor:
      theme.colorScheme === 'dark' ? theme.colors.dark[7] : '#FFFFFF',
    width: '80%',
    marginLeft: '90px',
  },
}));

const WellcomePage = () => {
  const { classes } = useStyles();
  const navigate = useNavigate();

  const {
    data: dataCity,
    isError: isErrorCity,
    isLoading: isLoadingCity,
  } = getCities();
  const {
    data: dataCompany,
    isError: isErrorComap,
    isLoading: isLoadingCompany,
  } = getCompanies();
  const {
    data: dataDelegates,
    isError: isErrorDelegates,
    isLoading: isLoadingDelegates,
  } = getDelegates();

  return (
    <>
      <Center>
        <Text className={classes.header}>Wellcome To drug Dashboard</Text>
      </Center>
      {/* <Paper className={classes.paperCards}> */}
      <Group position="center" spacing="xl">
        <Tooltip
          label="Click To show all city"
          withArrow
          color="red"
          transition="skew-up"
          transitionDuration={300}
        >
          <div
            className={classes.innerCard}
            onClick={() => navigate('/cities')}
          >
            <h2
              style={{
                color: '#91CA5A',
                marginLeft: '50px',
                fontFamily: 'cursive',
              }}
            >
              The Total Number City:
            </h2>
            <h1
              style={{
                color: '#3B72FF',
                marginLeft: '175px',
                fontFamily: 'fangsong',
                fontSize: '50px',
              }}
            >
              {isLoadingCity && <Loader variant="dots" />}
              {dataCity?.length}
            </h1>
          </div>
        </Tooltip>
        <Tooltip
          label="Click To show all company"
          withArrow
          color="red"
          transition="skew-up"
          transitionDuration={300}
        >
          <div
            className={classes.innerCard}
            onClick={() => navigate('/companies')}
          >
            <h2
              style={{
                color: '#91CA5A',
                marginLeft: '10px',
                fontFamily: 'cursive',
              }}
            >
              The Total Number Company:
            </h2>
            <h1
              style={{
                color: '#3B72FF',
                marginLeft: '175px',
                fontFamily: 'fangsong',
                fontSize: '50px',
              }}
            >
              {isLoadingCompany && <Loader variant="dots" />}
              {dataCompany?.length}
            </h1>
          </div>
        </Tooltip>
      </Group>
      <Group style={{ marginTop: '20px' }} position="center" spacing="xl">
        <Tooltip
          label="Click To show all Items"
          withArrow
          color="red"
          transition="skew-up"
          transitionDuration={300}
        >
          <div className={classes.innerCard}>
            <h2
              style={{
                color: '#91CA5A',
                marginLeft: '50px',
                fontFamily: 'cursive',
              }}
            >
              The Total Number Items:
            </h2>
            <h1
              style={{
                color: '#3B72FF',
                marginLeft: '175px',
                fontFamily: 'fangsong',
                fontSize: '50px',
              }}
            >
              4
            </h1>
          </div>
        </Tooltip>
        <Tooltip
          label="Click To show all Delegate"
          withArrow
          color="red"
          transition="skew-up"
          transitionDuration={300}
        >
          <div
            onClick={() => navigate('/delegates')}
            className={classes.innerCard}
          >
            <h2
              style={{
                color: '#91CA5A',
                marginLeft: '20px',
                fontFamily: 'cursive',
              }}
            >
              The Total Number Delegates:
            </h2>
            <h1
              style={{
                color: '#3B72FF',
                marginLeft: '175px',
                fontFamily: 'fangsong',
                fontSize: '50px',
              }}
            >
              {isLoadingDelegates && <Loader variant="dots" />}

              {dataDelegates?.length}
            </h1>
          </div>
        </Tooltip>
      </Group>
      {/* </Paper> */}
    </>
  );
};

export default WellcomePage;
