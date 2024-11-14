// Next Imports
import { useState } from 'react'

import dynamic from 'next/dynamic'

// MUI Imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import { lighten, useTheme } from '@mui/material/styles'

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

type DataType = {
  country: string
  sales: string
  trend: string
  trendNumber: string
}

// Vars
const data: DataType[] = [
  {
    country: 'Australia',
    sales: '18,879',
    trendNumber: '15%',
    trend: 'down'
  },
  {
    country: 'Canada',
    sales: '10,357',
    trendNumber: '85%',
    trend: 'up'
  },
  {
    country: 'India',
    sales: '4,860',
    trendNumber: '88%',
    trend: 'up'
  },
  {
    country: 'US',
    sales: '899',
    trendNumber: '16%',
    trend: 'down'
  },
  {
    country: 'Japan',
    sales: '43',
    trendNumber: '35%',
    trend: 'up'
  },
  {
    country: 'Brazil',
    sales: '18',
    trendNumber: '12%',
    trend: 'up'
  }
]

const deliveryExceptionsChartSeries = [13, 25, 22, 40]

const SalesInCountries2 = () => {
  // States
  const [value, setValue] = useState<string>('1')

  const handleChange = (event: SyntheticEvent, newValue: string) => {
    setValue(newValue)
  }

  // Hooks
  const theme = useTheme()

  const options: ApexOptions = {
    // labels: ['Incorrect address', 'Weather conditions', 'Federal Holidays', 'Damage during transit'],
    stroke: {
      width: 0
    },
    colors: [
      'var(--mui-palette-success-main)',
      lighten(theme.palette.success.main, 0.2),
      lighten(theme.palette.success.main, 0.4),
      lighten(theme.palette.success.main, 0.6)
    ],
    dataLabels: {
      enabled: false,
      formatter(val: string) {
        return `${Number.parseInt(val)}%`
      }
    },
    legend: {
      show: false,
      position: 'bottom',
      offsetY: 10,
      markers: {
        width: 8,
        height: 8,
        offsetY: 1,
        offsetX: theme.direction === 'rtl' ? 8 : -4
      },
      itemMargin: {
        horizontal: 15,
        vertical: 5
      },
      fontSize: '13px',
      fontWeight: 400,
      labels: {
        colors: 'var(--mui-palette-text-primary)',
        useSeriesColors: false
      }
    },
    grid: {
      padding: {
        top: 15
      }
    },
    plotOptions: {
      pie: {
        donut: {
          size: '75%',
          labels: {
            show: true,
            value: {
              fontSize: '24px',
              color: 'var(--mui-palette-text-primary)',
              fontWeight: 500,
              offsetY: -20
            },
            name: { offsetY: 20 },
            total: {
              show: true,
              fontSize: '0.9375rem',
              fontWeight: 400,
              label: 'AVG. Exceptions',
              color: 'var(--mui-palette-text-secondary)',
              formatter() {
                return '30%'
              }
            }
          }
        }
      }
    }
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
          <AppReactApexCharts
            type='donut'
            height={237}
            width='100%'
            series={deliveryExceptionsChartSeries}
            options={options}
          />
        </div>

        <div>
          <table className={tableStyles.table}>
            <tbody>
              {data.map((row, index) => (
                <tr key={index} className='first:border-bs'>
                  <td className='!pis-0'>
                    <Typography color='text.primary'>{row.country}</Typography>
                  </td>
                  <td className='text-end'>
                    <Typography color='text.primary' className='font-medium'>
                      {row.sales}
                    </Typography>
                  </td>
                  <td className='!pie-0'>
                    <div className='flex gap-2 items-center justify-end !pie-0'>
                      <Typography color='text.primary' className='font-medium'>
                        {row.trendNumber}
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
