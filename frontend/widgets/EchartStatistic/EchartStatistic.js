'use client'
import ReactECharts from 'echarts-for-react'

export default function EchartStatistic() {
	const option = {
		title: {
			text: 'Успеваемость по предметам',
		},
		toolbox: {
			feature: {
				saveAsImage: {},
				dataZoom: {},
				restore: {},
			},
		},
		tooltip: {},
		legend: {
			data: ['Label'],
		},
		xAxis: {
			data: ['Математика', 'Xимия', 'Биология', 'Информатика', 'Английский'],
		},
		yAxis: {},
		series: [
			{
				name: 'Предмет',
				type: 'bar',
				data: [4, 2, 2, 10, 10],
			},
		],
	}

	return (
		<ReactECharts
			option={option}
			style={{ height: 400, width: 400 }}
			// opts={{ locale: 'FR' }}
		/>
	)
}
