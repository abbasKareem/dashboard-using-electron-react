import isOnline from 'is-online';

import React, { useEffect, useRef, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import {
  Button,
  Center,
  Loader,
  Paper,
  Text,
  useMantineTheme,
} from '@mantine/core';

import { IconEdit, IconTrash } from '@tabler/icons';

import { toast } from 'react-toastify';
import { t } from 'i18next';
// import CompainesForm from 'renderer/components/CompaniesForm';
// import CompainesModal from 'renderer/components/CompaniesModal';
import { useMutation, useQueryClient } from 'react-query';
import {
  deleteDelegate,
  getDelegates,
  updateDelegate,
} from 'renderer/query/query';
import DelegatesModal from 'renderer/components/DelegatesModal';
import DelegateForm from 'renderer/components/DelegateForm';
import ErrorFetch from 'renderer/components/ErrorFetch';

const initialValue = {
  name: '',
  phone: '',
  email: '',
  city: '',
  almudhakher: '',
};

const Delegates = () => {
  const queryClient = useQueryClient();
  const theme = useMantineTheme();
  const gridRef = useRef();
  const [online, setOnline] = useState(true);

  const {
    mutateAsync,
    isLoading: deleteLoading,
    isError: isErrorDelete,
  } = useMutation(deleteDelegate);

  const {
    mutateAsync: mutateAsyncUpdate,
    isLoading: isUpdating,
    isError: isErrorUpdate,
  } = useMutation(updateDelegate);

  const [gridApi, setGridApi] = useState(null);
  const [open, setOpen] = React.useState(false);
  const [formData, setFormData] = useState(initialValue);
  const [delegateId, setDelegateId] = useState(null);

  const {
    data,
    isLoading,
    isError: isErrorGetDelegate,
    isSuccess,
    message,
    isFetching,
    error,
  } = getDelegates();

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setFormData(initialValue);
  };

  // =============columns================
  const defaultColDef = {
    sortable: true,
    // editable: true,
    // flex: 1,
    filter: true,
    resizable: true,
  };

  const columns = [
    {
      headerName: 'ID',
      field: 'id',
      checkboxSelection: true,
      filter: 'agTextColumnFilter',
    },
    {
      headerName: 'Name',
      field: 'name',
      filter: 'agTextColumnFilter',
    },
    {
      headerName: 'PHONE',
      field: 'phone',
      filter: 'agTextColumnFilter',
    },
    {
      headerName: 'Email',
      field: 'email',
      filter: 'agTextColumnFilter',
    },
    {
      headerName: 'CITY',
      field: 'city',
      filter: 'agTextColumnFilter',
    },
    {
      headerName: 'ALMUDHAKHER',
      field: 'almudhakher',
      filter: 'agTextColumnFilter',
    },
    {
      headerName: 'Actions',
      field: 'id',
      cellRendererFramework: (params) => (
        <div>
          <Button variant="outline" onClick={() => handleUpdate(params.data)}>
            <IconEdit />
          </Button>
          <Button
            sx={{ marginLeft: '5px', color: 'red', border: '1px solid red' }}
            variant="outline"
            onClick={() => handleDelete(params.value)}
          >
            <IconTrash />
          </Button>
        </div>
      ),
    },
  ];

  // =============columns================

  const onChange = (e) => {
    const { value, id } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleUpdate = (oldData) => {
    setFormData(oldData);
    setDelegateId(oldData.id);
    handleClickOpen();
  };

  const handleDelete = async (id) => {
    try {
      await mutateAsync(id);
      queryClient.invalidateQueries('delegates');
      toast.success('Delegate Deleted Successfully!', { autoClose: 2000 });
    } catch (error) {
      toast.error('Error from server...');
    }
  };

  const handleFormSubmit = async (e) => {
    // e.preventDefault();
    const data = {
      id: delegateId,
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      city: formData.city,
      almudhakher: formData.almudhakher,
    };
    try {
      await mutateAsyncUpdate(data);
      queryClient.invalidateQueries('delegates');
      toast.success('Delegate Edited Successfully!');
      handleClose();
    } catch (error) {
      // handleClose();
    }
  };

  const onGridReady = (params) => {
    setGridApi(params);
  };

  // useEffect(() => {
  //   const checkOnline = async () => {
  //     const browserOnline = await isOnline();
  //     setOnline(browserOnline);
  //   };
  //   checkOnline();
  // }, []);

  if (isUpdating) {
    return <Loader size="xl" stroke="2.0" />;
  }

  if (isErrorDelete) {
    return (
      <div>
        <p>Go Back</p>
        network error....
      </div>
    );
  }

  if (isErrorGetDelegate) {
    return <ErrorFetch />;
  }

  return (
    <>
      {/* {!online && <h1>Your are not online</h1>} */}
      <Text
        sx={{
          display: 'flex',
          fontSize: '40px',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        There are{' '}
        <span
          style={{ color: 'green', marginRight: '20px', marginLeft: '20px' }}
        >
          {data?.length}
        </span>{' '}
        Delegates
      </Text>
      {isErrorUpdate && <div>obbs something went wrong...</div>}
      <DelegateForm />

      <Paper sx={{ padding: '20px' }}>
        <div
          className={`${
            theme.colorScheme === 'light'
              ? 'ag-theme-alpine'
              : 'ag-theme-alpine-dark'
          }`}
          style={{ width: 'auto' }}
        >
          <AgGridReact
            ref={gridRef}
            rowSelection="multiple"
            columnDefs={columns}
            rowData={data}
            pagination={true}
            paginationPageSize={10}
            defaultColDef={defaultColDef}
            enableCharts={true}
            enableRangeSelection={true}
            domLayout="autoHeight"
            onGridReady={onGridReady}
          ></AgGridReact>
        </div>
      </Paper>

      <DelegatesModal
        open={open}
        handleClose={handleClose}
        data={formData}
        onChange={onChange}
        isErrorUpdate={isErrorUpdate}
        handleFormSubmit={handleFormSubmit}
        deleteLoading={deleteLoading}
      />
    </>
  );
};

export default Delegates;
