// MUI Imports
import MuiTabList from '@mui/lab/TabList'
import { styled } from '@mui/material/styles'
import type { TabListProps } from '@mui/lab/TabList'

// Type Imports
import type { ThemeColor } from '@core/types'

export type CustomTabListProps = TabListProps & {
  color?: ThemeColor
  pill?: 'true' | 'false'
}

const TabList2 = styled(MuiTabList)<CustomTabListProps>(({ color, theme, pill, orientation }) => ({
  ...(pill === 'true' && {
    minWidth: 40,
    minHeight: 20,
    ...(orientation === 'vertical'
      ? {
          borderInlineEnd: 0
        }
      : {
          borderBlockEnd: 0
        }),
    '&, & .MuiTabs-scroller': {
      ...(orientation === 'vertical' && {
        boxSizing: 'content-box'
      }),
      margin: `${theme.spacing(-1, -1, -1.5, -1)} !important`,
      padding: theme.spacing(1, 1, 1.5, 1)
    },
    '& .MuiTabs-indicator': {
      display: 'none'
    },
    '& .MuiTabs-flexContainer': {
      gap: theme.spacing(1)
    },
    '& .Mui-selected': {
      backgroundColor: `var(--mui-palette-${color}-main) !important`,
      color: `var(--mui-palette-${color}-contrastText) !important`,
      boxShadow: 'var(--mui-customShadows-xs)'
    },
    '& .MuiTab-root': {
      minWidth: 40,
      minHeight: 20,
      padding: theme.spacing(2, 4),
      borderRadius: 'var(--mui-shape-customBorderRadius-lg)',
      '&:hover': {
        border: 0,
        backgroundColor: `var(--mui-palette-${color}-lightOpacity)`,
        color: `var(--mui-palette-${color}-main)`,
        ...(orientation === 'vertical'
          ? {
              paddingInlineEnd: theme.spacing(4)
            }
          : {
              paddingBlockEnd: theme.spacing(2)
            })
      }
    }
  })
}))

const CustomTabList = (props: CustomTabListProps) => {
  // Props
  const { color = 'primary', ...rest } = props

  return <TabList2 color={color} {...rest} />
}

export default CustomTabList
