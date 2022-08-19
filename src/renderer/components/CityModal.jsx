import { useState } from 'react';
import {
  Modal,
  Button,
  Group,
  Input,
  Box,
  TextInput,
  Loader,
} from '@mantine/core';

const CityModal = ({
  open,
  handleClose,
  data,
  onChange,
  handleFormSubmit,
  isErrorUpdate,
}) => {
  const { cityId, cityName, cityCode, cityCensus } = data;

  return (
    <>
      {isErrorUpdate && <p>Something went wrong...</p>}
      <Modal
        closeOnClickOutside={false}
        opened={open}
        onClose={handleClose}
        title="Update City"
      >
        <form onSubmit={(e) => handleFormSubmit(e)}>
          <TextInput
            value={cityName}
            id="name"
            onChange={(e) => onChange(e)}
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
            value={cityCensus}
            onChange={(e) => onChange(e)}
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
            value={cityCode}
            onChange={(e) => onChange(e)}
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
  );
};

export default CityModal;
