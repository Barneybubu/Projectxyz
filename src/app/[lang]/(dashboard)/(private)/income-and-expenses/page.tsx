'use client'

import { forwardRef, useState } from 'react'

// MUI Imports
import { Box, Card, Grid, InputAdornment, TextField } from '@mui/material'
import type { TextFieldProps } from '@mui/material/TextField'

// Third-party Imports
import { addDays, format } from 'date-fns'

import Tab from '@mui/material/Tab'

import TabContext from '@mui/lab/TabContext'

import AddProductModal from '@/components/dialogs/add-product'

import AppReactDatepicker from '@/libs/styles/AppReactDatepicker'
import LogisticsShipmentStatistics from '@/views/apps/logistics/dashboard/LogisticsShipmentStatistics'
import UserListCards2 from '@/views/apps/user/list/UserListCards2'
import PaymentHistory2 from '@/views/dashboards/crm/PaymentHistory2'
import SalesInCountries2 from '@/views/dashboards/crm/SalesInCountries2'

// Component Imports
import CustomTabList from '@core/components/mui/TabList2'

// Data Imports
import ProductListTable2 from '@/views/apps/ecommerce/products/list/ProductListTable2'

import type { UserDataType } from '@components/card-statistics/HorizontalWithSubtitle'

type CustomInputProps = TextFieldProps & {
  label: string
  end: Date | number
  start: Date | number
}

// Vars
const userData: UserDataType[] = [
  {
    title: 'Income',
    stats: '21,459',
    avatarIcon: 'ri-group-line',
    avatarColor: 'primary',
    trend: 'positive',
    trendNumber: '29%',
    subtitle: 'Total User'
  },
  {
    title: 'Expenses',
    stats: '4,567',
    avatarIcon: 'ri-user-add-line',
    avatarColor: 'error',
    trend: 'positive',
    trendNumber: '18%',
    subtitle: 'Last week analytics'
  },
  {
    title: 'Cashflow',
    stats: '19,860',
    avatarIcon: 'ri-user-follow-line',
    avatarColor: 'success',
    trend: 'negative',
    trendNumber: '14%',
    subtitle: 'Last week analytics'
  }
]

const page = () => {
  // States
  const [open, setOpen] = useState<boolean>(false)
  const [startDate, setStartDate] = useState<Date | null | undefined>(new Date())
  const [endDate, setEndDate] = useState<Date | null | undefined>(addDays(new Date(), 15))

  // States
  const [value, setValue] = useState<string>('1')

  const handleChange = (event: SyntheticEvent, newValue: string) => {
    setValue(newValue)
  }

  // onChange handler
  const handleOnChange = (dates: any) => {
    const [start, end] = dates

    setStartDate(start)
    setEndDate(end)
  }

  // custom input for data
  const CustomInput = forwardRef((props: CustomInputProps, ref) => {
    const { label, start, end, ...rest } = props

    const startDate = format(start, 'dd MMMM, yyyy')
    const endDate = end !== null ? ` - ${format(end, 'dd MMMM, yyyy')}` : null

    const value = `${startDate}${endDate !== null ? endDate : ''}`

    return (
      <TextField
        InputProps={{
          startAdornment: (
            <InputAdornment position='start'>
              <i className='ri-calendar-line' />
            </InputAdornment>
          )
        }}
        fullWidth
        inputRef={ref}
        {...rest}
        label={label}
        value={value}
      />
    )
  })

  return (
    <Grid container spacing={6}>
      <Box className='flex w-full items-center justify-between gap-6 pl-6'>
        <Grid container spacing={6}>
          <Grid item xs={12} md={5}>
            <AppReactDatepicker
              selectsRange
              endDate={endDate}
              selected={startDate}
              startDate={startDate}
              id='date-range-picker'
              dateFormat='dd MMMM, yyyy'
              onChange={handleOnChange}
              shouldCloseOnSelect={false}
              customInput={
                <CustomInput label='Date Range' start={startDate as Date | number} end={endDate as Date | number} />
              }
            />
          </Grid>
        </Grid>

        <Grid item xs={12} md={2}>
          <Card className='p-1 border '>
            <TabContext value={value}>
              <CustomTabList pill='true' onChange={handleChange} aria-label='daily weekly monthly tab'>
                <Tab
                  value='1'
                  label='Week'
                  sx={{
                    fontSize: '12px'
                  }}
                />
                <Tab
                  value='2'
                  label='Month'
                  sx={{
                    fontSize: '12px'
                  }}
                />
                <Tab
                  value='3'
                  label='Year'
                  sx={{
                    fontSize: '12px'
                  }}
                />
              </CustomTabList>
            </TabContext>
          </Card>
        </Grid>
      </Box>

      <Grid item xs={12}>
        <UserListCards2 data={userData} />
      </Grid>

      <Grid item xs={12} md={8}>
        <Grid item xs={12} className='mb-5'>
          <LogisticsShipmentStatistics />
        </Grid>

        <ProductListTable2 setOpen={setOpen} />
      </Grid>

      <Grid item xs={12} md={4} spacing={6}>
        <Grid item xs={12} className='mb-5'>
          <SalesInCountries2 />
        </Grid>

        <PaymentHistory2 />
      </Grid>

      {open && <AddProductModal open={open} setOpen={setOpen} />}
    </Grid>
  )
}

export default page
