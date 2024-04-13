'use client'
import ReactECharts from 'echarts-for-react'

export default function EchartCircleStatistic() {
	const option = {
		title: {
			text: 'Расписание первой смены',
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
					{ value: 90, name: '1 Пара ( 9:30—11:00)' },
					{ value: 10, name: 'перерыв после 1 пары ( 11:10—12:40)' },
					{ value: 90, name: '2 пара (12:55—14:25)' },
					{ value: 15, name: 'Кофе-брейк после 2 пары (14:25—14:55)' },
					{ value: 90, name: '3-я пара (12:55—14:25)' },
					{ value: 20, name: 'Обед (14:25—14:55)' },
				],
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
