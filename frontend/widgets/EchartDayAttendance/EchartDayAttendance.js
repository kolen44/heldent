'use client'
import ReactECharts from 'echarts-for-react'

export default function EchartDayAttendance() {
	const option = {
		title: {
			text: 'Дневная посещаемость',
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
			style={{ height: 600, width: 500 }}
			// opts={{ locale: 'FR' }}
		/>
	)
}

const simpleChartData = [
	{ value: 40, name: 'История' },
	{ value: 38, name: 'География' },
	{ value: 32, name: 'Английский' },
	{ value: 30, name: 'Математика' },
]
