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

const DelegatesModal = ({
  open,
  handleClose,
  data,
  onChange,
  deleteLoading,
  handleFormSubmit,
  isErrorUpdate,
}) => {
  const { name, phone, email, city, almudhakher } = data;

  return (
    <>
      {isErrorUpdate && <p>Something went wrong...</p>}
      <Modal
        closeOnClickOutside={false}
        opened={open}
        onClose={handleClose}
        title="Delegate Form"
      >
        <form onSubmit={(e) => handleFormSubmit(e)}>
          <TextInput
            value={name}
            id="name"
            onChange={(e) => onChange(e)}
            autoFocus
            sx={{
              marginBottom: '20px',
            }}
            placeholder="Name"
            radius="lg"
            size="md"
          />
          <TextInput
            value={phone}
            id="phone"
            onChange={(e) => onChange(e)}
            autoFocus
            sx={{
              marginBottom: '20px',
            }}
            placeholder="Phone"
            radius="lg"
            size="md"
          />
          <TextInput
            value={email}
            id="email"
            onChange={(e) => onChange(e)}
            autoFocus
            sx={{
              marginBottom: '20px',
            }}
            placeholder="Email"
            radius="lg"
            size="md"
          />
          <TextInput
            value={city}
            id="city"
            onChange={(e) => onChange(e)}
            autoFocus
            sx={{
              marginBottom: '20px',
            }}
            placeholder="City"
            radius="lg"
            size="md"
          />
          <TextInput
            value={almudhakher}
            id="almudhakher"
            onChange={(e) => onChange(e)}
            autoFocus
            sx={{
              marginBottom: '20px',
            }}
            placeholder="Almudhakher"
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
            {deleteLoading && <Loader size={20} stroke />}
            Update
          </Button>
        </Box>
      </Modal>
    </>
  );
};

export default DelegatesModal;
