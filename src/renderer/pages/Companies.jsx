import React, { useEffect, useRef, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import {
  Container,
  Loader,
  Modal,
  useMantineTheme,
  Text,
  Button,
  Paper,
  createStyles,
  TextInput,
  Box,
} from '@mantine/core';
import axios from 'axios';

import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Spinner from 'renderer/components/Spinner';
import { t } from 'i18next';
import CompainesForm from 'renderer/components/CompaniesForm';
import CompainesModal from 'renderer/components/CompaniesModal';
import { useMutation, useQueryClient } from 'react-query';
import {
  deleteCompany,
  getCompanies,
  updateCompany,
} from 'renderer/query/query';

const initialValue = { name: '', manger_name: '' };
const Companies = () => {
  const queryClient = useQueryClient();
  const theme = useMantineTheme();
  const gridRef = useRef();

  const {
    mutateAsync,
    isLoading: deleteLoading,
    isError: isErrorDelete,
  } = useMutation(deleteCompany);
  const {
    mutateAsync: mutateAsyncUpdate,
    isLoading: isUpdating,
    isError: isErrorUpdate,
  } = useMutation(updateCompany);

  // --------------state--------------
  const [gridApi, setGridApi] = useState(null);
  const [open, setOpen] = React.useState(false);
  const [formData, setFormData] = useState(initialValue);
  const [companyId, setCompanyId] = useState(null);

  const {
    data,
    isLoading,
    isError: isErrorGetCompanies,
    isSuccess,
    message,
  } = getCompanies();

  // --------------end_state--------------

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
    flex: 1,
    filter: true,
    resizable: true,
  };

  const columns = [
    {
      headerName: t('action'),
      field: 'id',
      checkboxSelection: true,
      filter: 'agTextColumnFilter',
    },
    {
      headerName: t('company_name_column'),
      field: 'name',
      filter: 'agTextColumnFilter',
    },
    {
      headerName: t('company_manager_name_column'),
      field: 'manger_name',
      filter: 'agTextColumnFilter',
    },
    {
      headerName: 'Actions',
      field: 'id',
      cellRendererFramework: (params) => (
        <div>
          <Button variant="outline" onClick={() => handleUpdate(params.data)}>
            Update
          </Button>
          <Button
            sx={{ marginLeft: '5px' }}
            variant="outline"
            onClick={() => handleDelete(params.value)}
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];

  // =============columns================

  const onChange = (e) => {
    const { value, id } = e.target;
    console.log(value, id);
    setFormData({ ...formData, [id]: value });
  };

  const handleUpdate = (oldData) => {
    setFormData(oldData);
    console.log(formData);
    setCompanyId(oldData.id);
    console.log(companyId);
    handleClickOpen();
  };

  const handleDelete = async (id) => {
    try {
      await mutateAsync(id);
      queryClient.invalidateQueries('companies');
    } catch (error) {
      toast.error('Error from server...');
    }
  };

  const handleFormSubmit = async (e) => {
    // e.preventDefault();
    const data = {
      id: companyId,
      name: formData.name,
      manger_name: formData.manger_name,
    };
    try {
      await mutateAsyncUpdate(data);
      queryClient.invalidateQueries('companies');
      handleClose();
    } catch (error) {
      // handleClose();
    }
  };

  const onGridReady = (params) => {
    setGridApi(params);
  };

  if (isLoading) {
    toast.success('done donse ');
    return <Loader size={28} stroke={1.5} />;
  }

  if (isUpdating) {
    return <Loader size="xl" />;
  }

  if (isErrorDelete) {
    return <div>network error....</div>;
  }
  if (isErrorGetCompanies) {
    return <div>network error....</div>;
  }
  // if (isErrorUpdate) {
  //   return <div>network error while updating....</div>;
  // }

  return (
    <>
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
          {data.length}
        </span>{' '}
        Company
      </Text>
      {isErrorUpdate && <div>obbs something went wrong...</div>}
      <CompainesForm />

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
      <CompainesModal
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

export default Companies;
