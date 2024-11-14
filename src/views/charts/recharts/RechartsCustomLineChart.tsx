import dynamic from 'next/dynamic'

import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'

import type { TooltipProps } from '@/libs/Recharts'
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from '@/libs/Recharts'

const AppRecharts = dynamic(() => import('@/libs/styles/AppRecharts'))

const data = [
  { Assets: 50, Liabilities: 50, Networth: 50 },
  { Assets: 230, Liabilities: 220, Networth: 120 },
  { Assets: 180, Liabilities: 250, Networth: 100 },
  { Assets: 270, Liabilities: 180, Networth: 150 },
  { Assets: 240, Liabilities: 210, Networth: 130 },
  { Assets: 260, Liabilities: 240, Networth: 170 },
  { Assets: 220, Liabilities: 230, Networth: 160 },
  { Assets: 280, Liabilities: 190, Networth: 140 },
  { Assets: 250, Liabilities: 200, Networth: 110 },
  { Assets: 290, Liabilities: 210, Networth: 150 }
]

const CustomTooltip = (props: TooltipProps<any, any>) => {
  const { active, payload } = props

  if (active && payload && payload.length) {
    return (
      <div style={{ backgroundColor: '#1c1f2b', padding: '8px', borderRadius: '4px' }}>
        <Typography color='text.primary'>{`${payload[0].payload.name}`}</Typography>
        {payload.map((entry, index) => (
          <Typography key={`item-${index}`} style={{ color: entry.color, fontSize: '0.875rem' }}>
            {`${entry.dataKey}: ${entry.value}`}
          </Typography>
        ))}
      </div>
    )
  }

  return null
}

const RechartsCustomLineChart = () => {
  //   const theme = useTheme()

  return (
    <Card>
      <CardHeader
        title='New Technologies Data'
        subheader='Commercial networks & enterprises'
        sx={{
          flexDirection: ['column', 'row'],
          alignItems: ['flex-start', 'center'],
          '& .MuiCardHeader-action': { mb: 0 },
          '& .MuiCardHeader-content': { mb: [2, 0] }
        }}
        action={
          <Box display='flex' gap='20px' alignItems='center' mr={5}>
            <Box display='flex' alignItems='center' flexDirection={'column'} gap='6px'>
              <Typography fontSize='13px' color='#EAEAFF66' lineHeight='20px'>
                $8,539
              </Typography>
              <Box display='flex' alignItems='center'>
                <Box sx={{ width: 8, height: 8, bgcolor: '#4263eb', borderRadius: '50%', mr: 1 }} />
                <Typography color='text.secondary' fontSize='0.875rem'>
                  Assets
                </Typography>
              </Box>
            </Box>
            <Box display='flex' alignItems='center' flexDirection={'column'} gap='6px'>
              <Typography fontSize='13px' color='#EAEAFF66' lineHeight='20px'>
                $7,840
              </Typography>
              <Box display='flex' alignItems='center'>
                <Box sx={{ width: 8, height: 8, bgcolor: '#fa5252', borderRadius: '50%', mr: 1 }} />
                <Typography color='text.secondary' fontSize='0.875rem'>
                  Liabilities
                </Typography>
              </Box>
            </Box>
            <Box display='flex' alignItems='center' flexDirection={'column'} gap='6px'>
              <Typography fontSize='13px' color='#EAEAFF66' lineHeight='20px'>
                $2,359
              </Typography>{' '}
              <Box display='flex' alignItems='center'>
                <Box sx={{ width: 8, height: 8, bgcolor: '#fcc419', borderRadius: '50%', mr: 1 }} />
                <Typography color='text.secondary' fontSize='0.875rem'>
                  Networth
                </Typography>
              </Box>
            </Box>
          </Box>
        }
      />
      <CardContent>
        <AppRecharts>
          <div style={{ height: 350 }}>
            <ResponsiveContainer width='100%' height='100%'>
              <LineChart data={data} margin={{ top: 20, right: 20, left: 0, bottom: 0 }}>
                <CartesianGrid stroke='#30344b' />
                <XAxis dataKey='name' stroke='#8a8d99' />
                <YAxis stroke='#8a8d99' ticks={[100, 200, 300]} domain={[0, 'dataMax']} />
                <Tooltip content={<CustomTooltip />} />
                <Line type='monotone' dataKey='Assets' stroke='#4263eb' strokeWidth={3} dot={false} />
                <Line type='monotone' dataKey='Liabilities' stroke='#fa5252' strokeWidth={3} dot={false} />
                <Line type='monotone' dataKey='Networth' stroke='#fcc419' strokeWidth={3} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </AppRecharts>
      </CardContent>
    </Card>
  )
}

export default RechartsCustomLineChart
