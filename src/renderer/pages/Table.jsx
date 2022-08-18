import React, { useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { useMantineTheme } from '@mantine/core';

const columns = [
  {
    headerName: 'Athlete',
    field: 'athlete',
    checkboxSelection: true,
    filter: 'agTextColumnFilter',
    // pinned: true,
    // rowGroup: true,
    // hide: true,
  },
  {
    headerName: 'Age',
    field: 'age',
    filter: 'agTextColumnFilter',
  },
  {
    headerName: 'Bronze',
    field: 'bronze',
    filter: 'agTextColumnFilter',
  },
  {
    headerName: 'Bronze',
    filter: 'agTextColumnFilter',
    field: 'bronze',
  },
  {
    headerName: 'Country',
    filter: 'agTextColumnFilter',
    field: 'country',
  },
  {
    headerName: 'Date',
    filter: 'agTextColumnFilter',
    field: 'date',
  },
  {
    headerName: 'Gold',
    field: 'gold',
    filter: 'agTextColumnFilter',
  },
  {
    headerName: 'Gold',
    field: 'gold',
    filter: 'agTextColumnFilter',
  },
  {
    headerName: 'Silver',
    field: 'silver',
    filter: 'agTextColumnFilter',
  },
  {
    headerName: 'Sport',
    field: 'sport',
    filter: 'agTextColumnFilter',
  },
  {
    headerName: 'Total',
    field: 'total',
    filter: 'agTextColumnFilter',
  },
  {
    headerName: 'Year',
    field: 'year',
    filter: 'agTextColumnFilter',
  },
];

const Table = () => {
  const theme = useMantineTheme();
  // ----------------------------
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
  // ----------------------------

  const defaultColDef = {
    sortable: true,
    editable: true,
    // flex: 1,
    filter: true,
    resizable: true,

    // floatingFilter: true,
  };

  const datasource = {
    getRows(params) {
      console.log(params);
      const { startRow, endRow, filterModel, sortModel } = params.request;
      let url = 'http://localhost:3002/olympic?';
      // Sorting
      if (sortModel.length) {
        const { colId, sort } = sortModel[0];
        url += `_sort=${colId}&_order=${sort}&`;
      }
      // Filtering
      const filterKeys = Object.keys(filterModel);
      filterKeys.forEach((filter) => {
        url += `${filter}=${filterModel[filter].filter}&`;
      });

      // Pagination
      url += `_start=${startRow}&_end=${endRow}`;

      fetch(url)
        .then((httpResponse) => httpResponse.json())
        .then((response) => {
          if (response) {
            params.successCallback(response, 400);
          } else {
            params.successCallback(rowData, 400);
          }
        })
        .catch((error) => {
          console.error(error);
          params.failCallback();
        });
    },
  };

  const onGridReady = (params) => {
    params.api.setServerSideDatasource(datasource);
  };

  return (
    <div
      className={`${
        theme.colorScheme === 'light'
          ? 'ag-theme-alpine'
          : 'ag-theme-alpine-dark'
      }`}
      style={{ width: 'auto' }}
    >
      <AgGridReact
        columnDefs={columns}
        rowModelType="serverSide"
        serverSideStoreType="partial"
        pagination={true}
        paginationPageSize={8}
        defaultColDef={defaultColDef}
        onGridReady={onGridReady}
        enableCharts={true}
        enableRangeSelection={true}
        domLayout="autoHeight"
      ></AgGridReact>
    </div>
  );
};

export default Table;
