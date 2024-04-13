'use client'
import ReactECharts from 'echarts-for-react'

export default function EchartDayAttendance() {
	const option = {
		title: {
			text: 'Расписание второй смены',
			left: 'center',
		},
		legend: {
			orient: 'vertical',
			left: 'left',
		},
		toolbox: {
			show: true,
			feature: {
				mark: { show: true },
				dataView: { show: true, readOnly: false },
				restore: { show: true },
				saveAsImage: { show: true },
			},
		},
		series: [
			{
				name: 'Nightingale Chart',
				type: 'pie',
				radius: [50, 250],
				center: ['50%', '50%'],
				roseType: 'area',
				itemStyle: {
					borderRadius: 8,
				},
				data: simpleChartData,
			},
		],
	}

	return (
		<ReactECharts
			option={option}
			style={{ height: 600, width: 700 }}
			// opts={{ locale: 'FR' }}
		/>
	)
}

const simpleChartData = [
	{ value: 90, name: '4-я пара (14:55—16:25)' },
	{ value: 15, name: 'Перерыв' },
	{ value: 90, name: '5-я пара (16:40—18:10)' },
	{ value: 10, name: 'Перерыв' },
	{ value: 90, name: '6-я пара (18:20—19:50) ' },
	{ value: 10, name: 'Перерыв ' },
	{ value: 90, name: '7-я пара (20:00—21:30) ' },
]
