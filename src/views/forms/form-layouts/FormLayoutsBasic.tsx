'use client'

// React Imports
import { forwardRef, useState } from 'react'

import Link from 'next/link'

// Third-party Imports
import { addDays, format } from 'date-fns'

// MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import type { TextFieldProps } from '@mui/material/TextField'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'

import AppReactDatepicker from '@/libs/styles/AppReactDatepicker'

type CustomInputProps = TextFieldProps & {
  label: string
  end: Date | number
  start: Date | number
}

const FormLayoutsBasic = () => {
  // States
  const [isPasswordShown, setIsPasswordShown] = useState(false)
  const [isConfirmPasswordShown, setIsConfirmPasswordShown] = useState(false)

  const handleClickShowPassword = () => setIsPasswordShown(show => !show)

  const handleClickShowConfirmPassword = () => setIsConfirmPasswordShown(show => !show)

  // States
  const [startDate, setStartDate] = useState<Date | null | undefined>(new Date())
  const [endDate, setEndDate] = useState<Date | null | undefined>(addDays(new Date(), 15))

  const handleOnChange = (dates: any) => {
    const [start, end] = dates

    setStartDate(start)
    setEndDate(end)
  }

  const CustomInput = forwardRef((props: CustomInputProps, ref) => {
    const { label, start, end, ...rest } = props

    const startDate = format(start, 'MM/dd/yyyy')
    const endDate = end !== null ? ` - ${format(end, 'MM/dd/yyyy')}` : null

    const value = `${startDate}${endDate !== null ? endDate : ''}`

    return <TextField fullWidth inputRef={ref} {...rest} label={label} value={value} />
  })

  return (
    <Card>
      <CardHeader title='Basic' />
      <CardContent>
        <form onSubmit={e => e.preventDefault()}>
          <Grid container spacing={5}>
            <Grid item xs={12}>
              <TextField fullWidth label='Name' placeholder='John Doe' />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                type='email'
                label='Email'
                placeholder='johndoe@gmail.com'
                helperText='You can use letters, numbers & periods'
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label='Password'
                placeholder='············'
                id='form-layout-basic-password'
                type={isPasswordShown ? 'text' : 'password'}
                helperText='Use 8 or more characters with a mix of letters, numbers & symbols'
                InputProps={{
                  endAdornment: (
                    <InputAdornment position='end'>
                      <IconButton
                        size='small'
                        edge='end'
                        onClick={handleClickShowPassword}
                        onMouseDown={e => e.preventDefault()}
                        aria-label='toggle password visibility'
                      >
                        <i className={isPasswordShown ? 'ri-eye-off-line' : 'ri-eye-line'} />
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label='Confirm Password'
                placeholder='············'
                id='form-layout-basic-confirm-password'
                type={isConfirmPasswordShown ? 'text' : 'password'}
                helperText='Make sure to type the same password as above'
                InputProps={{
                  endAdornment: (
                    <InputAdornment position='end'>
                      <IconButton
                        size='small'
                        edge='end'
                        onClick={handleClickShowConfirmPassword}
                        onMouseDown={e => e.preventDefault()}
                        aria-label='toggle confirm password visibility'
                      >
                        <i className={isConfirmPasswordShown ? 'ri-eye-off-line' : 'ri-eye-line'} />
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <AppReactDatepicker
                selectsRange
                endDate={endDate ?? undefined}
                selected={startDate}
                id='date-range-picker'
                onChange={handleOnChange}
                shouldCloseOnSelect={false}
                customInput={
                  <CustomInput
                    label='Custom Date Range(Bappi)'
                    start={startDate as Date | number}
                    end={endDate as Date | number}
                  />
                }
              />
            </Grid>

            <Grid item xs={12}>
              <div className='flex items-center justify-between flex-wrap gap-5'>
                <Button variant='contained' type='submit'>
                  Get Started!
                </Button>
                <div className='flex items-center justify-center gap-2'>
                  <Typography color='text.primary'>Already have an account?</Typography>
                  <Link href='/' onClick={e => e.preventDefault()} className='text-primary'>
                    Log In
                  </Link>
                </div>
              </div>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  )
}

export default FormLayoutsBasic
