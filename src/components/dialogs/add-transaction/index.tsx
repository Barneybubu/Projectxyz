'use client'

// React Imports
import { forwardRef, useState } from 'react'

// MUI Imports

import {
  Box,
  Button,
  DialogActions,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select
} from '@mui/material'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import Grid from '@mui/material/Grid'
import type { TextFieldProps } from '@mui/material/TextField'
import TextField from '@mui/material/TextField'

import { addDays, format } from 'date-fns'

import AppReactDatepicker from '@/libs/styles/AppReactDatepicker'

// Types
type AddTransactionProps = {
  open: boolean
  setOpen: (open: boolean) => void
}

type CustomInputProps = TextFieldProps & {
  label: string
  start: Date | number
}

const AddTransactionModal = ({ open, setOpen }: AddTransactionProps) => {
  const [transactionType, setTransactionType] = useState('Income')
  const [category, setCategory] = useState('Foods & Beverages')
  const [newCategory, setNewCategory] = useState('Foods & Beverages')
  const [amount, setAmount] = useState('123,456')
  const [description, setDescription] = useState('Text')
  const [recurring, setRecurring] = useState('Once')
  const [startDate, setStartDate] = useState<Date | null>(new Date())
  const [endDate, setEndDate] = useState<Date | null>(addDays(new Date(), 15))

  // Handle Form Submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setOpen(false)
  }

  // Update start date independently
  const handleStartDateChange = (date: Date | null) => {
    if (date) setStartDate(date)
  }

  // Update end date independently
  const handleEndDateChange = (date: Date | null) => {
    if (date) setEndDate(date)
  }

  // custom input for data
  const CustomInput = forwardRef((props: CustomInputProps, ref) => {
    const { label, start, ...rest } = props

    const startDate = start ? format(start, 'dd MMMM, yyyy') : ''

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
        value={startDate}
      />
    )
  })

  return (
    <Dialog
      open={open}
      maxWidth='md'
      scroll='body'
      onClose={() => {
        setOpen(false)
      }}
    >
      <DialogTitle variant='h4' className='flex gap-2 flex-col  text-center sm:pbs-16 sm:pbe-12 sm:pli-16'>
        Add Transaction
      </DialogTitle>
      <form onSubmit={handleSubmit} className='w-full'>
        <form onSubmit={e => e.preventDefault()}>
          <DialogContent className='pbs-0 sm:pbe-6 sm:pli-16'>
            <IconButton onClick={() => setOpen(false)} className='absolute block-start-4 inline-end-4'>
              <i className='ri-close-line text-textSecondary' />
            </IconButton>

            <Grid container spacing={5} className='mt-2'>
              <Grid item xs={12} sm={6}>
                <AppReactDatepicker
                  selected={startDate}
                  id='start-date-picker'
                  dateFormat='dd MMMM, yyyy'
                  onChange={date => handleStartDateChange(date as Date | null)}
                  shouldCloseOnSelect={false}
                  customInput={<CustomInput label='Start Date' start={startDate as Date | number} />}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth variant='outlined'>
                  <InputLabel>Type</InputLabel>
                  <Select value={transactionType} label='Type' onChange={e => setTransactionType(e.target.value)}>
                    <MenuItem value='Income'>Income</MenuItem>
                    <MenuItem value='Expense'>Expense</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Box className='flex gap-2'>
                  <FormControl fullWidth variant='outlined'>
                    <InputLabel>Category</InputLabel>
                    <Select value={category} label='Category' onChange={e => setCategory(e.target.value)}>
                      <MenuItem value='Foods & Beverages'>Foods & Beverages</MenuItem>
                      <MenuItem value='Entertainment'>Entertainment</MenuItem>
                      <MenuItem value='Other'>Other</MenuItem>
                    </Select>
                  </FormControl>
                  <Box
                    className='flex gap-2 items-center justify-center rounded-lg cursor-pointer'
                    sx={{ width: '68px', border: '1px solid #666CFF' }}
                  >
                    <svg width='34' height='34' viewBox='0 0 34 34' fill='none' xmlns='http://www.w3.org/2000/svg'>
                      <path
                        d='M15.5833 15.5834V7.08337H18.4166V15.5834H26.9166V18.4167H18.4166V26.9167H15.5833V18.4167H7.08325V15.5834H15.5833Z'
                        fill='#666CFF'
                      />
                    </svg>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label='New Category'
                  name='newCategory'
                  variant='outlined'
                  placeholder='New Category'
                  value={newCategory}
                  onChange={e => setNewCategory(e.target.value)}
                />
              </Grid>{' '}
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label='Amount'
                  name='amount'
                  variant='outlined'
                  placeholder='Amount'
                  value={amount}
                  onChange={e => setAmount(e.target.value)}
                />
              </Grid>{' '}
              <Grid item xs={12} sm={6} />
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label='Description'
                  name='description'
                  variant='outlined'
                  placeholder='Text Description'
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth variant='outlined'>
                  <InputLabel>Recurring ?</InputLabel>
                  <Select value={recurring} label='Recurring ?' onChange={e => setRecurring(e.target.value)}>
                    <MenuItem value='Once'>Once</MenuItem>
                    <MenuItem value='Monthly'>Monthly</MenuItem>
                    <MenuItem value='Yearly'>Yearly</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <AppReactDatepicker
                  selected={endDate}
                  id='end-date-picker'
                  dateFormat='dd MMMM, yyyy'
                  onChange={date => handleEndDateChange(date as Date | null)}
                  shouldCloseOnSelect={false}
                  customInput={<CustomInput label='End Date' start={endDate as Date | number} />}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions className='justify-center pbs-0 sm:pbe-16 sm:pli-16 !pt-12'>
            <Button variant='contained' onClick={() => setOpen(false)} type='submit'>
              Submit
            </Button>
            <Button
              variant='outlined'
              color='secondary'
              onClick={() => {
                setOpen(false)
              }}
              type='reset'
            >
              Cancel
            </Button>
          </DialogActions>
        </form>
      </form>
    </Dialog>
  )
}

export default AddTransactionModal
