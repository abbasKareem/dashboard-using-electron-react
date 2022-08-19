import React, { useRef, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { Button, Loader, Text, useMantineTheme } from '@mantine/core';

import { toast } from 'react-toastify';
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
      headerName: 'ID',
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
    setFormData({ ...formData, [id]: value });
  };

  const handleUpdate = (oldData) => {
    setFormData(oldData);
    setCompanyId(oldData.id);
    handleClickOpen();
  };

  const handleDelete = async (id) => {
    try {
      await mutateAsync(id);
      queryClient.invalidateQueries('companies');
      toast.success('Company Deleted Successfully!', { autoClose: 2000 });
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
      toast.success('Company Edited Successfully!');
      handleClose();
    } catch (error) {
      // handleClose();
    }
  };

  const onGridReady = (params) => {
    setGridApi(params);
  };

  if (isLoading) {
    return <Loader size={28} stroke="2.0" />;
  }

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
