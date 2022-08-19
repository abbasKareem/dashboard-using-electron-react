import React, { useEffect, useRef, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { useMantineTheme } from '@mantine/core';
import axios from 'axios';

import { toast } from 'react-toastify';

const defaultColDef = {
  sortable: true,
  // editable: true,
  flex: 1,
  filter: true,
  resizable: true,
};

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

const columns = [
  {
    headerName: 'ACTION',
    field: 'id',
    checkboxSelection: true,
    filter: 'agTextColumnFilter',
    cellRendererFramework: (params) => (
      <>
        {/* eslint-disable-next-line react/button-has-type */}
        <button onClick={() => deleteButton(params)}>Delete</button>
      </>
    ),
    // pinned: true,
    // rowGroup: true,
    // hide: true,
  },
  {
    headerName: 'Name',
    field: 'name',
    filter: 'agTextColumnFilter',
  },
  {
    headerName: 'Census',
    field: 'census',
    filter: 'agTextColumnFilter',
  },
  {
    headerName: 'City_Code',
    field: 'city_code',
    filter: 'agTextColumnFilter',
  },
];

const Cities = () => {
  const [openedModal, setOpenedModal] = useState(false);
  const [Yes, setYes] = useState(false);
  const gridRef = useRef();

  const theme = useMantineTheme();

  // ----------------------------
  const [rowData, setRowData] = useState([
    {
      id: 1,
      name: 'بغداد',
      census: 7000000,
      city_code: 100,
    },
  ]);
  const [selectedData, setSelectedData] = useState({
    id: 0,
    name: '',
    census: 0,
    city_code: 0,
  });
  // ----------------------------

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'https://app0989.herokuapp.com/api/v1/citys'
        );
        if (response.data) {
          toast.success('Cities Loaded Successfully', {
            position: 'top-center',
            autoClose: 1000,
          });
          setRowData(response.data);
        }
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    };
    // eslint-disable-next-line promise/catch-or-return
    fetchData().then((response) => console.log(response));
  }, []);

  const onSelectionChanged = async (params) => {
    const singleRowData = params.api.getSelectedRows();
    setSelectedData(singleRowData[0]);
    console.log(selectedData);
  };

  return (
    <>
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
          onSelectionChanged={onSelectionChanged}
          rowSelection="multiple"
          columnDefs={columns}
          rowData={rowData}
          pagination
          paginationPageSize={8}
          defaultColDef={defaultColDef}
          enableCharts
          enableRangeSelection
          domLayout="autoHeight"
        />
      </div>
    </>
  );
};

export default Cities;
