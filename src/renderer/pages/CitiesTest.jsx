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
} from '@mantine/core';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';

import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import CitiesForm from 'renderer/components/CitiesForm';
import {
  getCities,
  reset,
  deleteCity,
} from 'renderer/redux/features/cities/citiesSlice';
import Spinner from 'renderer/components/Spinner';
import { t } from 'i18next';

const CitiesTest = () => {
  const theme = useMantineTheme();
  const dispatch = useDispatch();
  const gridRef = useRef();

  // --------------state--------------
  const { all_cities, isError, isSuccess, isLoading, message } = useSelector(
    (state) => state.cities
  );
  // --------------end_state--------------

  // ===============Delete City ===============
  const deleteButton = async (params) => {
    console.log(params.value);
    try {
      const URL = `https://app0989.herokuapp.com/api/v1/citys/${params.value}`;
      console.log(URL);
      const res = await axios.delete(URL);
      if (res.status === 200) {
        toast.info('City Deleted Successfully!', {
          position: 'top-center',
          autoClose: 3000,
        });
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  // ===============Delete City ===============

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
      cellRendererFramework: (params) => (
        <>
          <Button
            sx={{
              marginLeft: '20px',
              borderColor: theme.colors.red[6],
              color: theme.colorScheme === 'dark' ? theme.colors.red[6] : 'red',
            }}
            variant="outline"
            onClick={() => dispatch(deleteCity(params.value))}
          >
            {t('delete')}
          </Button>
        </>
      ),
      // pinned: true,
      // rowGroup: true,
      // hide: true,
    },
    {
      headerName: t('city_name'),
      field: 'name',
      filter: 'agTextColumnFilter',
    },
    {
      headerName: t('census'),
      field: 'census',
      filter: 'agTextColumnFilter',
    },
    {
      headerName: t('city_code'),
      field: 'city_code',
      filter: 'agTextColumnFilter',
    },
  ];

  // =============columns================

  useEffect(() => {
    if (isError) {
      return;
    }
    dispatch(getCities());

    // if (isSuccess) {
    //   toast.success('done', {
    //     position: 'top-center',
    //     autoClose: 200,
    //   });
    // }
    return () => {
      dispatch(reset());
    };
  }, [dispatch]);

  if (isError) {
    return (
      <Container>
        <Text>Server Error...</Text>
      </Container>
    );
  }

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <CitiesForm />

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
          rowSelection="single"
          columnDefs={columns}
          rowData={all_cities}
          pagination={true}
          paginationPageSize={8}
          defaultColDef={defaultColDef}
          enableCharts={true}
          enableRangeSelection={true}
          domLayout="autoHeight"
        ></AgGridReact>
      </div>
    </>
  );
};

export default CitiesTest;
