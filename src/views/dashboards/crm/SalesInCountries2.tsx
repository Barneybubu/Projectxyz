// Next Imports
import { useState } from 'react'

import type { SyntheticEvent } from 'react'

import dynamic from 'next/dynamic'

// MUI Imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import { useTheme } from '@mui/material/styles'

// Third-party Imports
import type { ApexOptions } from 'apexcharts'
import classnames from 'classnames'

// Components Imports

// Styles Imports
import { Box, Tab } from '@mui/material'

import TabContext from '@mui/lab/TabContext'

import CustomTabList from '@/@core/components/mui/TabList2'
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

const SalesInCountries2 = () => {
  // States
  const [value, setValue] = useState<string>('1')

  const handleChange = (event: SyntheticEvent, newValue: string) => {
    setValue(newValue)
  }

  // Vars
  const textSecondary = 'var(--mui-palette-text-secondary)'

  // Hooks
  const theme = useTheme()

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
      <Box className='flex items-center justify-between gap-3 pr-5'>
        <CardHeader title='Allocation' />

        <Card className='p-1 border'>
          <TabContext value={value}>
            <CustomTabList pill='true' onChange={handleChange} aria-label='daily weekly monthly tab'>
              <Tab
                value='1'
                label='Income'
                sx={{
                  fontSize: '12px'
                }}
              />

              <Tab
                value='2'
                label='Expenses'
                sx={{
                  fontSize: '12px'
                }}
              />
            </CustomTabList>
          </TabContext>
        </Card>
      </Box>

      <CardContent className='flex flex-col gap-4'>
        <div className='flex flex-col gap-1.5'>
          <AppReactApexCharts type='donut' height={350} width='100%' series={[85, 16, 50, 50]} options={options} />
        </div>

        <div>
          <table className={tableStyles.table}>
            <thead className='uppercase'>
              <tr className='border-be'>
                <th className='bg-transparent font-normal'>Country</th>
                <th className='bg-transparent text-center font-normal bs-[2.875rem]'>amount</th>
                <th className='bg-transparent text-end font-normal bs-[2.875rem]'>percent</th>
              </tr>
            </thead>

            <tbody>
              {data.map((row, index) => (
                <tr key={index} className='first:border-bs'>
                  <td className='!pis-0'>
                    <div className='flex items-center gap-4'>
                      <img width={30} height={30} alt={row.imgAlt} src={row.imgSrc} />
                      <Typography color='text.primary' className='font-medium'>
                        {row.country}
                      </Typography>
                    </div>
                  </td>

                  <td className='text-end'>
                    <Typography color='text.primary' className='font-medium'>
                      {row.subscribers}
                    </Typography>
                  </td>

                  <td className='!pie-0'>
                    <div className='flex gap-2 items-center justify-end !pie-0'>
                      <Typography color='text.primary' className='font-medium'>
                        {row.percent}
                      </Typography>
                      <i
                        className={classnames(
                          row.trend === 'up' ? 'ri-arrow-up-s-line' : 'ri-arrow-down-s-line',
                          row.trend === 'up' ? 'text-success' : 'text-error'
                        )}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}

export default SalesInCountries2
