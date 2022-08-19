import {
  Button,
  Center,
  createStyles,
  Input,
  Loader,
  Modal,
  Paper,
  TextInput,
} from '@mantine/core';
import React, { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import { addCity } from 'renderer/query/query';

const useStyles = createStyles((theme) => ({
  wrpperInputs: {
    width: '100%',
    display: 'flex',
    gap: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '20px',
    marginBottom: '20px',
  },
  inputField: {
    width: '30%',
    transition: 'box-shadow 150ms ease, transform 100ms ease',
    '&:hover': {
      boxShadow: `${theme.shadows.md} !important`,
      transform: 'scale(1.05)',
    },
  },
}));

const CityForm = () => {
  const queryClient = useQueryClient();
  const { classes } = useStyles();
  // -----------------STATE -----------------------
  const [cityName, setCityName] = useState('');
  const [census, setCensus] = useState(null);
  const [cityCode, setCityCode] = useState(null);
  // -----------------STATE -----------------------

  // -----------------FUNCTIONS -----------------------

  const { mutateAsync, isLoading, isError } = useMutation(addCity);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!cityName || !census || !cityCode) {
      toast.error('All Feild Required!');
    } else {
      try {
        await mutateAsync({ name: cityName, census, city_code: cityCode });
        setCityName('');
        setCensus('');
        setCityCode('');
        queryClient.invalidateQueries('cities');
        toast.success('City added Successfully!');
      } catch (error) {
        toast.error(error);
      }
    }
  };
  // -----------------FUNCTIONS -----------------------

  return (
    <Paper>
      {isError && <Modal opened={true}>Ooops, Something Went Wrong...</Modal>}
      <form>
        <Center sx={{}}>
          <div className={classes.wrpperInputs}>
            <TextInput
              value={cityName}
              onChange={(e) => setCityName(e.target.value)}
              size="md"
              className={classes.inputField}
              label="City Name"
              placeholder="Enter City Name"
            />
            <TextInput
              type="number"
              value={census}
              onChange={(e) => setCensus(e.target.value)}
              size="md"
              className={classes.inputField}
              label="City Census"
              placeholder="Enter City Census"
            />
            <TextInput
              type="number"
              value={cityCode}
              onChange={(e) => setCityCode(e.target.value)}
              size="md"
              className={classes.inputField}
              label="City Code"
              placeholder="Enter City Code"
            />
          </div>
        </Center>
        <Center>
          <Button
            variant="outline"
            type="submit"
            onClick={(e) => handleSubmit(e)}
            size="xl"
            sx={{ marginBottom: '20px' }}
          >
            {isLoading ? <Loader /> : <p>Submit</p>}
          </Button>
        </Center>
      </form>
    </Paper>
  );
};

export default CityForm;
