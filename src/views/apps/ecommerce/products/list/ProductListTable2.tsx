'use client'

// React Imports
import type { SyntheticEvent } from 'react'
import { useState } from 'react'

// MUI Imports
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'

// Third-party Imports
import classnames from 'classnames'
import { rankItem } from '@tanstack/match-sorter-utils'
import type { FilterFn } from '@tanstack/react-table'
import type { RankingInfo } from '@tanstack/match-sorter-utils'

// Type Imports
import TabContext from '@mui/lab/TabContext'

import { Tab } from '@mui/material'

import type { ThemeColor } from '@core/types'
import type { ProductType } from '@/types/apps/ecommerceTypes'

// Component Imports
import CustomAvatar from '@core/components/mui/Avatar'
import OptionMenu from '@core/components/option-menu'

// Style Imports
import tableStyles from '@core/styles/table.module.css'
import CustomTabList from '@/@core/components/mui/TabList'

declare module '@tanstack/table-core' {
  interface FilterFns {
    fuzzy: FilterFn<unknown>
  }
  interface FilterMeta {
    itemRank: RankingInfo
  }
}

type ProductCategoryType = {
  [key: string]: {
    icon: string
    color: ThemeColor
  }
}

// Vars
const productCategoryObj: ProductCategoryType = {
  Accessories: { icon: 'ri-headphone-line', color: 'error' },
  'Home Decor': { icon: 'ri-home-6-line', color: 'info' },
  Electronics: { icon: 'ri-computer-line', color: 'primary' },
  Shoes: { icon: 'ri-footprint-line', color: 'success' },
  Office: { icon: 'ri-briefcase-line', color: 'warning' },
  Games: { icon: 'ri-gamepad-line', color: 'secondary' }
}

interface TabContentType {
  price: string
  date: string
  chipColor?: ThemeColor
  chipLabel: string
  category: string
}

// Vars
const data: TabContentType[] = [
  {
    price: '$12.5k',
    date: '01/11/2024',
    category: 'Electronics',
    chipColor: 'error',
    chipLabel: 'Inactive'
  },
  {
    price: '$45k',
    date: '01/11/2024',
    category: 'Electronics',
    chipColor: 'success',
    chipLabel: 'Publish'
  },
  {
    price: '$98.2k',
    date: '01/11/2024',
    category: 'Accessories',
    chipColor: 'warning',
    chipLabel: 'Scheduled'
  },
  {
    price: '$210k',
    date: '01/11/2024',
    category: 'Accessories',
    chipColor: 'success',
    chipLabel: 'Publish'
  }
]

const ProductListTable2 = ({ setOpen }: { setOpen: (open: boolean) => void }) => {
  // States
  const [value, setValue] = useState<string>('1')

  // handle tab change
  const handleChange = (event: SyntheticEvent, newValue: string) => {
    setValue(newValue)
  }

  return (
    <>
      <Card>
        <div className='flex justify-between flex-col items-start sm:flex-row sm:items-center gap-y-4 p-5'>
          <TabContext value={value}>
            <CustomTabList onChange={handleChange} aria-label='row tabs'>
              <Tab value='1' label='Income' />
              <Tab value='2' label='Expenses' />
              <Tab value='3' label='Cashflow' />
            </CustomTabList>
          </TabContext>

          <div className='flex items-center max-sm:flex-col gap-4 max-sm:is-full is-auto'>
            <Button
              color='secondary'
              variant='outlined'
              className='max-sm:is-full is-auto'
              startIcon={<i className='ri-upload-2-line' />}
            >
              Export
            </Button>

            <Button
              variant='contained'
              onClick={() => setOpen(true)}
              startIcon={<i className='ri-add-line' />}
              className='max-sm:is-full is-auto'
            >
              Add Product
            </Button>
          </div>
        </div>

        <div className='overflow-x-auto'>
          <div className='overflow-x-auto'>
            <table className={tableStyles.table}>
              <thead className='border-be border-bs'>
                <tr>
                  <th className='uppercase bg-transparent'>Date</th>
                  <th className='uppercase bg-transparent w-44'>Category</th>
                  <th className='uppercase bg-transparent text-end'>Type</th>
                  <th className='uppercase bg-transparent text-end'>Amount</th>
                  <th className='uppercase bg-transparent text-end'>Actions</th>
                </tr>
              </thead>

              <tbody>
                {data.map((row: TabContentType, index: number) => (
                  <tr key={index}>
                    <td>{row.date}</td>

                    <td className='w-44'>
                      <div className='flex items-center gap-3'>
                        <CustomAvatar skin='light' color={`${productCategoryObj[row.category]?.color}`} size={30}>
                          <i className={classnames(`${productCategoryObj[row.category]?.icon}`, 'text-lg')} />
                        </CustomAvatar>
                        <Typography color='text.primary'>{row.category}</Typography>
                      </div>
                    </td>

                    <td className='text-end'>
                      <Chip label={row.chipLabel} color={row.chipColor} size='small' variant='tonal' />
                    </td>

                    <td className='font-medium text-end'>{row.price}</td>

                    <td className='font-medium text-end'>
                      <div className='flex items-center justify-end'>
                        <IconButton size='small'>
                          <i className='ri-edit-box-line text-[22px] text-textSecondary' />
                        </IconButton>

                        <OptionMenu
                          iconButtonProps={{ size: 'medium' }}
                          iconClassName='text-textSecondary text-[22px]'
                          options={[
                            { text: 'Download', icon: 'ri-download-line' },
                            {
                              text: 'Delete',
                              icon: 'ri-delete-bin-7-line'
                            },
                            { text: 'Duplicate', icon: 'ri-stack-line' }
                          ]}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Card>
    </>
  )
}

export default ProductListTable2
