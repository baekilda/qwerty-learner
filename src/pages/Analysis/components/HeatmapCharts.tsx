import { isOpenDarkModeAtom } from '@/store'
import { useAtom } from 'jotai'
import type { FC } from 'react'
import React from 'react'
import type { Activity } from 'react-activity-calendar'
import ActivityCalendar from 'react-activity-calendar'
import { Tooltip as ReactTooltip } from 'react-tooltip'
import 'react-tooltip/dist/react-tooltip.css'

interface HeatmapChartsProps {
  title: string
  data: Activity[]
}

const HeatmapCharts: FC<HeatmapChartsProps> = ({ data, title }) => {
  const [isOpenDarkMode] = useAtom(isOpenDarkModeAtom)

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="text-center text-xl font-bold text-gray-600	dark:text-white">{title}</div>
      <ActivityCalendar
        fontSize={20}
        blockSize={22}
        blockRadius={7}
        style={{
          padding: '40px 60px 20px 100px',
          color: isOpenDarkMode ? '#fff' : '#000',
        }}
        colorScheme={isOpenDarkMode ? 'dark' : 'light'}
        data={data}
        theme={{
          light: ['#f0f0f0', '#6366f1'],
          dark: ['hsl(0, 0%, 22%)', '#818cf8'],
        }}
        renderBlock={(block, activity) =>
          React.cloneElement(block, {
            'data-tooltip-id': 'react-tooltip',
            'data-tooltip-html': `${activity.date}: ${activity.count} 회`,
          })
        }
        showWeekdayLabels={true}
        labels={{
          months: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
          weekdays: ['일', '월', '화', '수', '목', '금', '토'],
          totalCount: '지난 1년 동안 {{count}} 회',
          legend: {
            less: '많음',
            more: '적음',
          },
        }}
      />
      <ReactTooltip id="react-tooltip" />
    </div>
  )
}

export default HeatmapCharts
