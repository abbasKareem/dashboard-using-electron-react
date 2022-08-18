import { Button, Container, makeStyles } from '@material-ui/core';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import MyButton from './components/MyButton';
import MaterialTable from 'material-table';
// ==================================
import { forwardRef } from 'react';
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import { Paper, useMantineTheme } from '@mantine/core';
// ==================================

const useStyles = makeStyles({
  root: {
    backgroundColor: '#FEFBF6',
  },
  link: {
    textDecoration: 'none',
    color: '#513252',
  },
});

const TablePage = () => {
  const theme = useMantineTheme();
  console.log(theme);

  // ==================================
  const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => (
      <ChevronRight {...props} ref={ref} />
    )),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => (
      <ChevronLeft {...props} ref={ref} />
    )),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => (
      <ArrowDownward {...props} ref={ref} />
    )),
    ThirdStateCheck: forwardRef((props, ref) => (
      <Remove {...props} ref={ref} />
    )),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
  };
  // ==================================
  const [tableData, setTableData] = useState([]);
  const data = [
    {
      athlete: 'Michael Phelps',
      age: 23,
      country: 'United States',
      year: 2008,
      date: '24/08/2008',
      gold: 8,
      silver: 0,
      sport: 'Swimming',
      total: 8,
      year: 2008,
    },
  ];

  const columns = [
    { title: 'Athlete', field: 'athlete', width: 150 },
    { title: 'Age', field: 'age' },
    { title: 'Country', field: 'country' },
    { title: 'Year', field: 'year' },
    { title: 'Date', field: 'date' },
    { title: 'Sport', field: 'sport' },
    { title: 'Gold', field: 'gold' },
    { title: 'Silver', field: 'silver' },
    { title: 'Bronze', field: 'bronze' },
    { title: 'Total', field: 'total' },
  ];

  console.log(tableData);
  return (
    <Paper>
      <MaterialTable
        icons={tableIcons}
        title="Olympic Data"
        columns={columns}
        options={{
          debounceInterval: 700,
          padding: 'dense',
          filtering: true,
          exportButton: true,
          fixedColumns: {
            left: 2,
          },
        }}
        data={(query) =>
          new Promise((resolve, reject) => {
            // prepare your data and then call resolve like this:
            console.log(query);
            let url = 'http://localhost:3002/olympic?';
            if (query.search) {
              url += `q=${query.search}`;
            }
            if (query.orderBy) {
              url += `&_sort=${query.orderBy.field}&_order=${query.orderDirection}`;
            }
            if (query.filters.length) {
              const filter = query.filters.map((filter) => {
                return `&${filter.column.field}${filter.operator}${filter.value}`;
              });
              url += filter.join('');
            }

            url += `&_page=${query.page + 1}`;
            url += `&_limit=${query.pageSize}`;
            fetch(url)
              .then((resp) => resp.json())
              .then((resp) => {
                resolve({
                  data: resp, // your data array
                  page: query.page, // current page number
                  totalCount: 499, // total row number
                });
              });
          })
        }
      />
    </Paper>
  );
};

export default TablePage;
