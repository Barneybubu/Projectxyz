'use client'

// Next Imports
import type { SyntheticEvent } from 'react'
import { useState } from 'react'

import dynamic from 'next/dynamic'

// Third-party Imports
import classnames from 'classnames'

// MUI Imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import { useTheme } from '@mui/material/styles'

// Third-party Imports
import { Box, Tab, TablePagination, Typography } from '@mui/material'
import type { ApexOptions } from 'apexcharts'

// Style Imports
import TabContext from '@mui/lab/TabContext'

import CustomTabList from '@/@core/components/mui/TabList'
import tableStyles from '@core/styles/table.module.css'

// Styled Component Imports
const AppReactApexCharts = dynamic(() => import('@/libs/styles/AppReactApexCharts'))

// Vars
const donutColors = {
  series1: '#fdd835',
  series2: '#00d4bd',
  series3: '#826bf8',
  series4: '#32baff',
  series5: '#ffa1a1'
}

type DataType = {
  country: string
  imgAlt: string
  imgSrc: string
  subscribers: string
  percent: string
  trend: 'up' | 'down'
}

// Vars
const data: DataType[] = [
  {
    country: 'USA',
    imgAlt: 'USA',
    imgSrc: '/images/cards/us.png',
    subscribers: '22,450',
    percent: '+22.5%',
    trend: 'up'
  },
  {
    country: 'India',
    imgAlt: 'India',
    imgSrc: '/images/cards/india.png',
    subscribers: '28,568',
    percent: '+28.5%',
    trend: 'up'
  },
  {
    country: 'Brazil',
    imgAlt: 'Brazil',
    imgSrc: '/images/cards/brazil.png',
    subscribers: '8,457',
    percent: '-8.3%',
    trend: 'down'
  },
  {
    country: 'Australia',
    imgAlt: 'Australia',
    imgSrc: '/images/cards/australia.png',
    subscribers: '2,850',
    percent: '+15.2%',
    trend: 'up'
  },
  {
    country: 'France',
    imgAlt: 'France',
    imgSrc: '/images/cards/france.png',
    subscribers: '1,930',
    percent: '-12.6%',
    trend: 'down'
  },
  {
    country: 'China',
    imgAlt: 'China',
    imgSrc: '/images/cards/china.png',
    subscribers: '852',
    percent: '-2.4%',
    trend: 'down'
  }
]

const ApexDonutChart = () => {
  // Hooks
  const theme = useTheme()

  const [value, setValue] = useState<string>('1')

  const handleChange = (event: SyntheticEvent, newValue: string) => {
    setValue(newValue)
  }

  // Vars
  const textSecondary = 'var(--mui-palette-text-secondary)'

  const options: ApexOptions = {
    stroke: { width: 0 },
    labels: ['Operational', 'Networking', 'Hiring', 'R&D'],
    colors: [donutColors.series1, donutColors.series5, donutColors.series3, donutColors.series2],
    dataLabels: {
      enabled: true,
      formatter: (val: string) => `${parseInt(val, 10)}%`
    },
    legend: {
      show: false,
      fontSize: '13px',
      position: 'bottom',
      markers: {
        offsetX: theme.direction === 'rtl' ? 7 : -4
      },
      labels: { colors: textSecondary },
      itemMargin: {
        horizontal: 9
      }
    },
    plotOptions: {
      pie: {
        donut: {
          labels: {
            show: true,
            name: {
              fontSize: '1.2rem'
            },
            value: {
              fontSize: '1.2rem',
              color: textSecondary,
              formatter: (val: string) => `${parseInt(val, 10)}`
            },
            total: {
              show: true,
              fontSize: '1.2rem',
              label: 'Operational',
              formatter: () => '31%',
              color: 'var(--mui-palette-text-primary)'
            }
          }
        }
      }
    },
    responsive: [
      {
        breakpoint: 992,
        options: {
          chart: {
            height: 380
          },
          legend: {
            position: 'bottom'
          }
        }
      },
      {
        breakpoint: 576,
        options: {
          chart: {
            height: 320
          },
          plotOptions: {
            pie: {
              donut: {
                labels: {
                  show: true,
                  name: {
                    fontSize: '1rem'
                  },
                  value: {
                    fontSize: '1rem'
                  },
                  total: {
                    fontSize: '1rem'
                  }
                }
              }
            }
          }
        }
      }
    ]
  }

  return (
    <Card>
      <CardHeader
        title='Allocation'
        action={
          <Card className='p-1 border'>
            <TabContext value={value}>
              <CustomTabList pill='true' onChange={handleChange} aria-label='daily weekly monthly tab'>
                <Tab
                  value='1'
                  label='Assets'
                  sx={{
                    fontSize: '12px'
                  }}
                />

                <Tab
                  value='2'
                  label='Liabilities'
                  sx={{
                    fontSize: '12px'
                  }}
                />
              </CustomTabList>
            </TabContext>
          </Card>
        }
      />

      <CardContent>
        <AppReactApexCharts type='donut' width='100%' height={400} options={options} series={[85, 16, 50, 50]} />
      </CardContent>

      <div className='overflow-x-auto pbe-1'>
        <table className={tableStyles.table}>
          <thead className='uppercase'>
            <tr className='border-be'>
              <th className='bg-transparent font-normal bs-[2.875rem]'>Country</th>
              <th className='bg-transparent text-center font-normal bs-[2.875rem]'>amount</th>
              <th className='bg-transparent text-end font-normal bs-[2.875rem]'>percent</th>
            </tr>
          </thead>

          <tbody>
            {data.map((row, index) => (
              <tr key={index} className='border-0'>
                <td className='!pbe-[22px]'>
                  <div className='flex items-center gap-4'>
                    <img width={30} height={30} alt={row.imgAlt} src={row.imgSrc} />
                    <Typography color='text.primary' className='font-medium'>
                      {row.country}
                    </Typography>
                  </div>
                </td>
                <td align='center' className='!pbe-[22px]'>
                  <Typography className='font-medium'>{row.subscribers}</Typography>
                </td>
                <td className='!pbe-[22px] text-end'>
                  <li className='flex items-center justify-end gap-1'>
                    <Typography color={row.trend === 'down' ? 'error.main' : 'success.main'} className='font-medium'>
                      {row.percent}
                    </Typography>
                    <i
                      className={classnames(
                        row.trend === 'down' ? 'ri-arrow-down-s-line text-error ' : 'ri-arrow-up-s-line text-success'
                      )}
                    />
                  </li>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <TablePagination
            sx={{ borderBottom: 0 }}
            rowsPerPageOptions={[5, 10, 25, 50]}
            count={13}
            page={0}
            onPageChange={(_, page) => console.log(page)}
            rowsPerPage={5}
            onRowsPerPageChange={e => console.log(e.target.value)}
          />
        </Box>
      </div>
      {/* pagination here */}
    </Card>
  )
}

export default ApexDonutChart
