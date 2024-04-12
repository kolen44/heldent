'use client'
import ReactECharts from 'echarts-for-react'

export default function EchartCircleStatistic() {
	const option = {
		title: {
			text: 'Посещаемость студента',
			left: 'center',
		},
		toolbox: {
			feature: {
				saveAsImage: {},
			},
		},
		tooltip: {
			trigger: 'item',
		},
		legend: {
			orient: 'vertical',
			left: 'left',
		},
		series: [
			{
				name: 'Учебный предмет',
				type: 'pie',
				radius: '50%',
				data: [
					{ value: 13, name: 'Математика' },
					{ value: 1, name: 'Биология' },
					{ value: 23, name: 'Информатика' },
					{ value: 23, name: 'Английский' },
				],
				emphasis: {
					itemStyle: {
						shadowBlur: 10,
						shadowOffsetX: 0,
						shadowColor: 'rgba(0, 0, 0, 0.5)',
					},
				},
			},
		],
	}

	return (
		<ReactECharts
			option={option}
			style={{ height: 600, width: 600 }}
			// opts={{ locale: 'FR' }}
		/>
	)
}
