import React, { useMemo, useState, useEffect } from 'react'
import clsx from 'clsx'
import moment from 'moment'
import { makeStyles } from '@material-ui/core/styles'
import { Button } from '@material-ui/core'
import { AgGridColumn, AgGridReact } from 'ag-grid-react';

import ModalDialog from '../ModalDialog'

import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

const useStyles = makeStyles(theme => ({
  wrapper: {
    height: window.innerHeight - 125,
    width: '100%'
  },
  button: {
    marginBottom: '10px',
    marginRight: '10px'
  }
}))

const GridTable = props => {
  const classes = useStyles()
  const { rowData, columns, updateRow, fileName, deleteRow, createRow, type } = props
  const [gridApi, setGridApi] = useState(null);
  const [isClicked, setIsClicked] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const onGridReady = (params) => setGridApi(params.api)
  const handleExport = () => gridApi.exportDataAsCsv({ fileName })
  const handleClick = () => setIsClicked(true)

  const defaultColDef = useMemo((col) => {
    return {
      resizable: true,
      sortable: true,
      filter: 'agTextColumnFilter',
    }
  }, []);

  const handleRemove = async () => {
    const selectedData = gridApi.getSelectedRows();
    gridApi.applyTransaction({ remove: selectedData });
    await deleteRow(selectedData[0])
    setIsOpen(false)
  }

  const handleUpdate = async () => {
    const selectedData = gridApi.getSelectedRows();
    await updateRow(selectedData[0])
  }

  const onPaginationChanged = async (e) => {
    if (e.newPage) {
      await localStorage.setItem(type, e.api.paginationGetCurrentPage());
    }
  }

  useEffect(() => {
    if (gridApi) {
      gridApi.paginationProxy.currentPage = +localStorage.getItem(type);
    }
  }, [gridApi, type])

  return (
    <>
      <Button className={classes.button} disabled={!rowData.length} variant='outlined' onClick={handleExport}>
        Завантажити файл
      </Button>
      <Button className={classes.button} disabled={!isClicked} variant='outlined' onClick={() => setIsOpen(true)}>
        Видалити обраний рядок
      </Button>
      <Button className={classes.button} disabled={!isClicked} variant='outlined' onClick={handleUpdate}>
        Перейти до редагування
      </Button>
      <Button className={classes.button} variant='outlined' onClick={createRow}>
        Створити новий запис
      </Button>
      <div className={clsx("ag-theme-alpine", classes.wrapper)}>
        <AgGridReact
          gridOptions={{
            rowSelection: 'single',
            pagination: true,
            paginationAutoPageSize: true,
            onPaginationChanged,
            reactUi: true,
            defaultColDef,
            rowData,
            onGridReady,
            onRowClicked: handleClick,
            suppressExcelExport: true,
            suppressContextMenu: true,
            localeText: {
              filterOoo: 'Фільтр',
              searchOoo: 'Пошук',
              pinColumn: 'Прикріпити колонку',
              pinLeft: 'Прикріпити зліва',
              pinRight: 'Прикріпити справа',
              autosizeThiscolumn: 'Порівняти цю колонку',
              autosizeAllColumns: 'Порівняти всі колонки',
              resetColumns: 'Скинути налаштування',
              noPin: 'Не прикріпляти',
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
          {columns.map(column => <AgGridColumn {...column} key={column.field} {...(column.isDate && { valueFormatter: ({ value }) => value ? moment.utc(value).format('DD-MM-YYYY') : '' })} />)}
        </AgGridReact>
        <ModalDialog
          open={isOpen}
          handleClose={() => setIsOpen(false)}
          handleSubmit={() => handleRemove()}
          title={'Чи ви впевнені, що хочете видалити цей запис'}
          submitMessage={'Так'}
          rejectMessage={'Ні'}
        />
      </div >
    </>
  )
}

export default GridTable
