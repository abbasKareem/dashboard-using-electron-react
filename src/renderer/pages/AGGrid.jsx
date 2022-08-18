import React, { useCallback, useEffect, useRef, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-enterprise';

import 'ag-grid-community/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/styles/ag-theme-alpine.css'; // Optional theme CSS
import { createStyles, Paper, useMantineTheme } from '@mantine/core';
import axios from 'axios';
import { toast } from 'react-toastify';
const columns = [
  {
    headerName: 'Athlete',
    field: 'athlete',
    checkboxSelection: true,
    pinned: true,
    // rowGroup: true,
    // hide: true,
  },
  {
    headerName: 'Age',
    field: 'age',
  },
  {
    headerName: 'Bronze',
    field: 'bronze',
  },
  {
    headerName: 'Bronze',
    field: 'bronze',
  },
  {
    headerName: 'Country',
    field: 'country',
  },
  {
    headerName: 'Date',
    field: 'date',
  },
  {
    headerName: 'Gold',
    field: 'gold',
  },
  {
    headerName: 'Gold',
    field: 'gold',
  },
  {
    headerName: 'Silver',
    field: 'silver',
  },
  {
    headerName: 'Sport',
    field: 'sport',
  },
  {
    headerName: 'Total',
    field: 'total',
  },
  {
    headerName: 'Year',
    field: 'year',
  },
];

const useStyles = createStyles((theme) => ({
  // container: {
  // },
}));

const AGGrid = () => {
  const gridRef = useRef();
  const [rowData, setRowData] = useState([
    {
      age: 0,
      athlete: '',
      bronze: 0,
      country: '',
      date: '',
      gold: 0,
      silver: 0,
      sport: '',
      total: 0,
      year: 0,
    },
  ]);
  const theme = useMantineTheme();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3002/olympic');
        if (response.data) {
          console.log(response.data);
          setRowData(response.data);
        }
      } catch (error) {
        toast.error(error.message);
      }
    };
    fetchData();
  }, []);

  const onGridReady = (params) => {
    console.log(params);
  };

  const enableCharts = true;
  const enableRangeSelection = false;
  const defaultColDef = {
    sortable: true,
    editable: true,
    filter: true,
    // flex: 1,
    minWidth: 100,
    minHight: 400,
    filter: true,
    resizable: true,
    floatingFilter: true,
  };

  return (
    <>
      <div
        className={`${
          theme.colorScheme === 'light'
            ? 'ag-theme-alpine'
            : 'ag-theme-alpine-dark'
        }`}
        style={{
          width: 'auto',
        }}
      >
        <AgGridReact
          ref={gridRef}
          enableCharts={true}
          enableRangeSelection={true}
          onGridReady={onGridReady}
          rowData={rowData}
          columnDefs={columns}
          defaultColDef={defaultColDef}
          pagination={true}
          domLayout="autoHeight"
          paginationPageSize={50}
          // onFirstDataRendered={onFirstDataRendered}
        />
      </div>
      {/* <div id="myChart" className="ag-theme-alpine my-chart"></div> */}
    </>
  );
};

export default AGGrid;
