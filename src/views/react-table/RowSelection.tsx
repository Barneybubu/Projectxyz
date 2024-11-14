'use client'

// React Imports
import { useMemo, useState } from 'react'

// MUI Imports
import Card from '@mui/material/Card'
import Checkbox from '@mui/material/Checkbox'

// Third-party Imports
import type { ColumnDef } from '@tanstack/react-table'
import { createColumnHelper, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table'

// Type Imports
import { Box, Button, Tab } from '@mui/material'

import TabContext from '@mui/lab/TabContext'

import type { DataType } from './data'

// Style Imports
import styles from '@core/styles/table.module.css'

// Data Imports
import defaultData from './data'

import CustomTabList from '@/@core/components/mui/TabList'

// Column Definitions
const columnHelper = createColumnHelper<DataType>()

const RowSelection = () => {
  // States
  const [value, setValue] = useState<string>('1')

  const handleChange = (event: SyntheticEvent, newValue: string) => {
    setValue(newValue)
  }

  // States
  const [rowSelection, setRowSelection] = useState({})
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [data, setData] = useState(() => defaultData)

  // Hooks
  const columns = useMemo<ColumnDef<DataType, any>[]>(
    () => [
      {
        id: 'select',
        header: ({ table }) => (
          <div className='flex items-center'>
            <Checkbox
              {...{
                checked: table.getIsAllRowsSelected(),
                indeterminate: table.getIsSomeRowsSelected(),
                onChange: table.getToggleAllRowsSelectedHandler()
              }}
            />
          </div>
        ),
        cell: ({ row }) => (
          <div className='flex items-center'>
            <Checkbox
              {...{
                checked: row.getIsSelected(),
                disabled: !row.getCanSelect(),
                indeterminate: row.getIsSomeSelected(),
                onChange: row.getToggleSelectedHandler()
              }}
            />
          </div>
        )
      },
      columnHelper.accessor('fullName', {
        cell: info => info.getValue(),
        header: 'Name'
      }),
      columnHelper.accessor('email', {
        cell: info => info.getValue(),
        header: 'Email'
      }),
      columnHelper.accessor('start_date', {
        cell: info => info.getValue(),
        header: 'Date'
      }),
      columnHelper.accessor('experience', {
        cell: info => info.getValue(),
        header: 'Experience'
      }),
      columnHelper.accessor('age', {
        cell: info => info.getValue(),
        header: 'Age'
      })
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  const table = useReactTable({
    data,
    columns,
    state: {
      rowSelection
    },
    enableRowSelection: true, //enable row selection for all rows
    // enableRowSelection: row => row.original.age > 18, // or enable row selection conditionally per row
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    filterFns: {
      fuzzy: () => false
    }
  })

  return (
    <Card>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', p: 4 }}>
        <TabContext value={value}>
          <CustomTabList onChange={handleChange} aria-label='row tabs'>
            <Tab value='1' label='Income' />
            <Tab value='2' label='Expenses' />
            <Tab value='3' label='Cashflow' />
          </CustomTabList>
        </TabContext>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Button variant='outlined' color='secondary'>
            <i className='ri-download-2-line mie-1' />
            Export
          </Button>
          <Button variant='contained'>
            <i className='ri-add-line mie-1' />
            Add Transaction
          </Button>
        </Box>
      </Box>

      <div className='overflow-x-auto'>
        <table className={styles.table}>
          <thead>
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <th key={header.id}>
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody>
            {table
              .getRowModel()
              .rows.slice(0, 10)
              .map(row => {
                return (
                  <tr key={row.id} {...(row.getIsSelected() && { className: 'selected' })}>
                    {row.getVisibleCells().map(cell => (
                      <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
                    ))}
                  </tr>
                )
              })}
          </tbody>
        </table>
      </div>
    </Card>
  )
}

export default RowSelection
