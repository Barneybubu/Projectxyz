'use client'

// React Imports
import type { SyntheticEvent } from 'react'
import { useState } from 'react'

// MUI Import
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import Avatar from '@mui/material/Avatar'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import Chip from '@mui/material/Chip'
import Tab from '@mui/material/Tab'

// Third-party Imports
import classnames from 'classnames'

// Types Imports
import { Button, IconButton, Typography } from '@mui/material'

import type { ThemeColor } from '@core/types'

// Components Imports
import CustomAvatar from '@core/components/mui/Avatar'
import OptionMenu from '@core/components/option-menu'

// Style Imports
import tableStyles from '@core/styles/table.module.css'

type ProductCategoryType = {
  [key: string]: {
    icon: string
    color: ThemeColor
  }
}
interface TabAvatarType {
  imgWidth: number
  category: string
  imgHeight: number
}
interface TabContentType {
  price: string
  date: string
  chipColor?: ThemeColor
  chipLabel: string
  category: string
}
interface TabContentDataType {
  mobile: TabContentType[]
  desktop: TabContentType[]
  console: TabContentType[]
}

const tabAvatars: TabAvatarType[] = [
  {
    imgWidth: 26,
    imgHeight: 52,
    category: 'mobile'
  },
  {
    imgWidth: 50,
    imgHeight: 40,
    category: 'desktop'
  },
  {
    imgWidth: 57,
    imgHeight: 40,
    category: 'console'
  }
]

const tabContentData: TabContentDataType = {
  mobile: [
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
  ],
  desktop: [
    {
      price: '$17.5k',
      date: '01/11/2024',
      category: 'Electronics',
      chipColor: 'error',
      chipLabel: 'Inactive'
    },
    {
      price: '$35k',
      date: '01/11/2024',
      category: 'Electronics',
      chipColor: 'success',
      chipLabel: 'Public'
    },
    {
      price: '$220k',
      date: '01/11/2024',
      category: 'Shoes',
      chipColor: 'success',
      chipLabel: 'Public'
    },
    {
      price: '$88.2k',
      date: '01/11/2024',
      category: 'Office',
      chipColor: 'warning',
      chipLabel: 'Scheduled'
    }
  ],
  console: [
    {
      price: '$599',
      date: '01/11/2024',
      category: 'Office',
      chipColor: 'success',
      chipLabel: 'Public'
    },
    {
      price: '$489',
      date: '01/11/2024',
      category: 'Shoes',
      chipColor: 'warning',
      chipLabel: 'Scheduled'
    },
    {
      price: '$335',
      date: '01/11/2024',
      category: 'Games',
      chipColor: 'error',
      chipLabel: 'Inactive'
    },
    {
      price: '$14',
      date: '01/11/2024',
      category: 'Games',
      chipColor: 'success',
      chipLabel: 'Public'
    }
  ]
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

const RenderTabContent = ({ data }: { data: TabContentType[] }) => {
  return (
    <div className='overflow-x-auto'>
      <table className={tableStyles.table}>
        <thead className='border-be border-bs'>
          <tr>
            <th className='uppercase bg-transparent'>Date</th>
            <th className='uppercase bg-transparent'>Category</th>
            <th className='uppercase bg-transparent text-end'>Type</th>
            <th className='uppercase bg-transparent text-end'>Amount</th>
            <th className='uppercase bg-transparent text-end'>Actions</th>
          </tr>
        </thead>

        <tbody>
          {data.map((row: TabContentType, index: number) => (
            <tr key={index}>
              <td>{row.date}</td>
              <td>
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
  )
}

const TopReferralSources = ({
  title,
  setOpen
}: {
  title?: string
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  // State
  const [value, setValue] = useState<string>('mobile')

  const handleChange = (event: SyntheticEvent, newValue: string) => {
    setValue(newValue)
  }

  const RenderTabAvatar = ({ data }: { data: TabAvatarType }) => (
    <Avatar
      variant='rounded'
      className={classnames(
        value === data.category ? 'border-solid border-primary' : 'border-dashed',
        'is-[92px] bs-[86px] border-2 bg-transparent rounded'
      )}
    >
      <img
        src={`/images/cards/${data.category}.png`}
        alt={`${data.category}`}
        width={data.imgWidth}
        height={data.imgHeight}
      />
    </Avatar>
  )

  return (
    <Card>
      <CardHeader
        title={title || 'Top Referral Sources'}
        subheader='Number of Sales'
        action={
          <Button onClick={() => setOpen && setOpen(true)} variant='contained' color='primary'>
            <i className='ri-add-line mie-1' />
            Add Transaction
          </Button>
        }
      />
      <TabContext value={value}>
        <TabList
          variant='scrollable'
          scrollButtons='auto'
          onChange={handleChange}
          aria-label='top referral sources tabs'
          className='!border-be-0 pli-5'
          sx={{
            '& .MuiTab-root:not(:last-child)': { mr: 4 },
            '& .MuiTab-root:hover': { border: 0 },
            '& .MuiTabs-indicator': { display: 'none !important' }
          }}
        >
          <Tab disableRipple value='mobile' className='p-0' label={<RenderTabAvatar data={tabAvatars[0]} />} />
          <Tab disableRipple value='desktop' className='p-0' label={<RenderTabAvatar data={tabAvatars[1]} />} />
          <Tab disableRipple value='console' className='p-0' label={<RenderTabAvatar data={tabAvatars[2]} />} />
          <Tab
            disabled
            value='add'
            className='p-0'
            label={
              <Avatar variant='rounded' className='is-[92px] bs-[86px] border-2 border-dashed bg-transparent rounded'>
                <div className='flex justify-center items-center bg-actionSelected rounded-lg p-1'>
                  <i className='ri-add-line text-textSecondary text-[22px]' />
                </div>
              </Avatar>
            }
          />
        </TabList>

        <TabPanel sx={{ p: 0 }} value='mobile'>
          <RenderTabContent data={tabContentData['mobile']} />
        </TabPanel>
        <TabPanel sx={{ p: 0 }} value='desktop'>
          <RenderTabContent data={tabContentData['desktop']} />
        </TabPanel>
        <TabPanel sx={{ p: 0 }} value='console'>
          <RenderTabContent data={tabContentData['console']} />
        </TabPanel>
      </TabContext>
    </Card>
  )
}

export default TopReferralSources
