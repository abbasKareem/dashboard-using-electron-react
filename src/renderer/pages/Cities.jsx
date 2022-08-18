import React, { useEffect, useRef, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { Modal, useMantineTheme } from '@mantine/core';
import axios from 'axios';

import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const defaultColDef = {
  sortable: true,
  // editable: true,
  flex: 1,
  filter: true,
  resizable: true,
};

const columns = [
  {
    headerName: 'ACTION',
    field: 'id',
    checkboxSelection: true,
    filter: 'agTextColumnFilter',
    cellRendererFramework: (params) => (
      <>
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

const deleteButton = async (params) => {
  console.log(params.value);

  try {
    let URL = `https://app0989.herokuapp.com/api/v1/citys/${params.value}`;
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
  const [seletedData, setSeletedData] = useState({
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
    fetchData();
  }, []);

  const onSelectionChanged = async (params) => {
    const singlRowData = params.api.getSelectedRows();
    setSeletedData(singlRowData[0]);
    console.log(seletedData);

    // try {
    //   let URL = `https://app0989.herokuapp.com/api/v1/citys/${singlRowData[0].id}`;
    //   console.log(URL);
    //   const res = await axios.delete(URL);
    //   if (res.status === 200) {
    //     toast.info('City Deleted Successfully!', {
    //       position: 'top-center',
    //       autoClose: 3000,
    //     });
    //   }
    // } catch (error) {
    //   toast.error(error.message);
    // }
  };

  return (
    <>
      {/* <Modal
        opened={openedModal}
        onClose={() => setOpenedModal(false)}
        title="Are Yor Sure You Want To Delete?"
      >
        <button onClick={() => setYes(true)}>Yes</button>
        <button>No</button>
      </Modal> */}
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

export default Cities;
