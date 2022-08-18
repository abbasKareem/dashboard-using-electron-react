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

const CompainesModal = ({
  open,
  handleClose,
  data,
  onChange,
  deleteLoading,
  handleFormSubmit,
  isErrorUpdate,
}) => {
  const { id, name, manger_name } = data;

  return (
    <>
      {isErrorUpdate && <p>Something went wrong...</p>}
      <Modal
        closeOnClickOutside={false}
        opened={open}
        onClose={handleClose}
        title="Company Form"
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
            lable="Manager Name"
            id="manger_name"
            value={manger_name}
            onChange={(e) => onChange(e)}
            sx={{
              marginBottom: '20px',
            }}
            placeholder="manager name"
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
            {id ? 'Update' : 'Submit'}
          </Button>
        </Box>
      </Modal>
    </>
  );
};

export default CompainesModal;
