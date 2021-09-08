import React, { useMemo, useState } from 'react'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import { Button } from '@material-ui/core/'
import { AgGridColumn, AgGridReact } from 'ag-grid-react';

import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

const useStyles = makeStyles(theme => ({
  wrapper: {
    height: window.innerHeight - 125,
    width: '100%'
  },
  button: {
    marginBottom: '10px'
  }
}))

const GridTable = props => {
  const classes = useStyles()
  const { rowData, columns, onClick, fileName } = props

  const [gridApi, setGridApi] = useState(null);

  const onGridReady = (params) => {
    setGridApi(params.api);
  };

  const handleExport = () => {
    gridApi.exportDataAsCsv({ fileName });
  };

  const defaultColDef = useMemo(() => ({
    resizable: true,
    sortable: true,
    filter: 'agTextColumnFilter',
  }), []);


  return (
    <>
      <Button className={classes.button} variant='outlined' onClick={handleExport}>
        Завантажити файл
      </Button>
      <div className={clsx("ag-theme-alpine", classes.wrapper)}>
        <AgGridReact
          gridOptions={{
            rowSelection: 'single',
            pagination: true,
            paginationAutoPageSize: true,
            reactUi: true,
            defaultColDef,
            rowData,
            onGridReady,
            onRowClicked: onClick,
            suppressExcelExport: true,
            localeText: {
              filterOoo: 'Фільтр',
              equals: 'Дорівнює',
              notEqual: 'Не дорівнює',
              empty: 'Виберіть одне',
              contains: 'Містить',
              notContains: 'Не містить',
              startsWith: 'Починається з',
              endsWith: 'Закінчується на',
              lessThan: 'Раніше ніж',
              greaterThan: 'Пізніше ніж',
              inRange: 'В проміжку',
            }
          }}
        >
          {columns.map(column => <AgGridColumn {...column} key={column.field} />)}
        </AgGridReact>
      </div >
    </>
  )
}

export default GridTable
