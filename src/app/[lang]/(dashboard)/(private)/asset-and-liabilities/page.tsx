'use client'

import { forwardRef, useState } from 'react'

import dynamic from 'next/dynamic'

import { Box, Card, Grid, InputAdornment, Tab, TextField } from '@mui/material'

import type { TextFieldProps } from '@mui/material/TextField'

import { addDays, format } from 'date-fns'

import TabContext from '@mui/lab/TabContext'

import AppReactDatepicker from '@/libs/styles/AppReactDatepicker'
import UserListCards2 from '@/views/apps/user/list/UserListCards2'

import CustomTabList from '@/@core/components/mui/TabList2'
import AddTransactionModal from '@/components/dialogs/add-transaction'
import ApexDonutChart from '@/views/charts/apex/ApexDonutChart2'
import RechartsCustomLineChart from '@/views/charts/recharts/RechartsCustomLineChart'
import TopReferralSources from '@/views/dashboards/ecommerce/TopReferralSources2'
import type { UserDataType } from '@components/card-statistics/HorizontalWithSubtitle'

type CustomInputProps = TextFieldProps & {
  label: string
  end: Date | number
  start: Date | number
}

// Vars
const data: UserDataType[] = [
  {
    title: 'Assets',
    stats: '21,459',
    avatarIcon: 'ri-group-line',
    avatarColor: 'primary',
    trend: 'positive',
    trendNumber: '29%',
    subtitle: 'Last week'
  },
  {
    title: 'Liabilities',
    stats: '4,567',
    avatarIcon: 'ri-user-add-line',
    avatarColor: 'error',
    trend: 'positive',
    trendNumber: '18%',
    subtitle: 'Last week analytics'
  },
  {
    title: 'Networth',
    stats: '19,860',
    avatarIcon: 'ri-user-follow-line',
    avatarColor: 'success',
    trend: 'negative',
    trendNumber: '14%',
    subtitle: 'Last week'
  }
]

const page = () => {
  // react hook
  const [startDate, setStartDate] = useState<Date | null | undefined>(new Date())
  const [endDate, setEndDate] = useState<Date | null | undefined>(addDays(new Date(), 15))

  const [open, setOpen] = useState<boolean>(false)

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
          <Card className='p-1 border'>
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
        <UserListCards2 data={data} />
      </Grid>

      <Grid item xs={12}>
        <RechartsCustomLineChart />
      </Grid>

      <Grid item xs={12} md={8}>
        <Grid className='mb-6'>
          <TopReferralSources title='Assets' setOpen={setOpen} />
        </Grid>

        <Grid>
          <TopReferralSources title='Liabilities' setOpen={setOpen} />
        </Grid>
      </Grid>

      <Grid item xs={12} md={4}>
        <ApexDonutChart />
      </Grid>

      {open && <AddTransactionModal open={open} setOpen={setOpen} />}
    </Grid>
  )
}

export default dynamic(() => Promise.resolve(page), { ssr: false })
