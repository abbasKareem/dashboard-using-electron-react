import {
  Box,
  Button,
  Center,
  createStyles,
  Loader,
  Modal,
  Paper,
  Text,
  TextInput,
} from '@mantine/core';
import React, { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import { deleteCity, updateCity } from 'renderer/query/query';
import CityModal from './CityModal';

const useStyles = createStyles((theme) => ({
  headerName: {
    fontSize: '15px',
    fontWeight: 700,
    textTransform: 'uppercase',
    color:
      theme.colorScheme === 'dark'
        ? theme.colors.gray[4]
        : theme.colors.blue[9],
  },
  name: {
    color:
      theme.colorScheme === 'dark'
        ? theme.colors.orange[6]
        : theme.colors.yellow[6],
    marginLeft: '20px',
    fontSize: '20px',
    fontWeight: '700',
  },
  row: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: '20px',
  },
}));

const initialValue = { cityName: '', cityCensus: '', cityCode: '' };
const CityItem = ({ cityId, cityName, cityCensus, cityCode }) => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState(initialValue);
  const [cityNameForm, setCityName] = useState(cityName);
  const [cityCensusForm, setCityCensus] = useState(cityCensus);
  const [cityCodeForm, setCityCode] = useState(cityCode);

  const queryClient = useQueryClient();
  const { classes } = useStyles();

  const {
    mutateAsync,
    isLoading: deleteLoading,
    isError: isErrorDelete,
  } = useMutation(deleteCity);

  const {
    mutateAsync: mutateAsyncUpdate,
    isLoading: isUpdating,
    isError: isErrorUpdate,
  } = useMutation(updateCity);

  const handleDelete = async () => {
    try {
      await mutateAsync(cityId);
      queryClient.invalidateQueries('cities');
      toast.success('City Deleted Successfully!', { autoClose: 2000 });
    } catch (error) {
      toast.error('Error from server...', { autoClose: 2000 });
    }
  };

  const onChange = (e) => {
    const { value, id } = e.target;
    console.log(formData);
    setFormData({ ...formData, [id]: value });
    console.log(formData);
  };

  const handleUpdate = () => {
    setFormData({ cityId, cityName, cityCensus, cityCode });
    handleClickOpen();
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setFormData(initialValue);
  };

  const handleFormSubmit = async (e) => {
    // e.preventDefault();
    const data = {
      id: cityId,
      name: cityNameForm,
      census: cityCensusForm,
      city_code: cityCodeForm,
    };
    try {
      await mutateAsyncUpdate(data);
      queryClient.invalidateQueries('cities');
      toast.success('City Edited Successfully!');
      handleClose();
    } catch (error) {
      // handleClose();
    }
  };

  return (
    <>
      {deleteLoading ? (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Loader size="lg" />
        </div>
      ) : (
        <>
          <Box className={classes.row}>
            <Text className={classes.headerName}>Name of City:</Text>
            <Text className={classes.name}>{cityName}</Text>
          </Box>
          <Box className={classes.row}>
            <Text className={classes.headerName}>Census:</Text>
            <Text className={classes.name}>{cityCensus}</Text>
          </Box>
          <Box className={classes.row}>
            <Text className={classes.headerName}>City Code:</Text>
            <Text className={classes.name}>{cityCode}</Text>
          </Box>
          <Center
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              marginTop: '20px',
              marginBottom: '20px',
            }}
          >
            <Button color="red" variant="outline" onClick={handleDelete}>
              {deleteLoading ? <Loader /> : <p>DELETE</p>}
            </Button>
            <Button variant="outline" onClick={handleUpdate}>
              UPDATE
            </Button>
          </Center>

          <Modal
            closeOnClickOutside={false}
            opened={open}
            onClose={handleClose}
            title="Update City"
          >
            <form onSubmit={(e) => handleFormSubmit(e)}>
              <TextInput
                value={cityNameForm}
                id="name"
                onChange={(e) => setCityName(e.target.value)}
                sx={{
                  marginBottom: '20px',
                }}
                placeholder="City Name"
                radius="lg"
                size="md"
              />
              <TextInput
                lable="City Census"
                id="city_census"
                value={cityCensusForm}
                onChange={(e) => setCityCensus(e.target.value)}
                sx={{
                  marginBottom: '20px',
                }}
                placeholder="City Census"
                radius="lg"
                size="md"
              />
              <TextInput
                lable="City Code"
                id="city_code"
                value={cityCodeForm}
                onChange={(e) => setCityCode(e.target.value)}
                sx={{
                  marginBottom: '20px',
                }}
                placeholder="City Code"
                radius="lg"
                size="md"
              />
            </form>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '20px',
              }}
            >
              <Button onClick={handleClose} variant="outline" color="red">
                Cancel
              </Button>
              <Button
                onClick={() => handleFormSubmit()}
                variant="outline"
                color="red"
              >
                Update
              </Button>
            </Box>
          </Modal>
        </>
      )}
    </>
  );
};

export default CityItem;
