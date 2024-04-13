import EchartCircleStatistic from '../../../widgets/EchartCircleStatistic/EchartCircleStatistic'
import EchartDayAttendance from '../../../widgets/EchartDayAttendance/EchartDayAttendance'

export default function Statistic() {
	return (
		<div className='flex flex-col overflow-y-hidden h-100 w-100 text-white'>
			<div className='flex flex-row gap-5'>
				<EchartCircleStatistic />
				<EchartDayAttendance />
			</div>
			<div>
				<h1>
					1. Планируй день заранее: Постарайтесь составить список задач и
					определить приоритеты еще накануне. Это поможет вам точно знать, на
					что сосредоточиться в течение дня.
					<br /> 2. Разбивайте время на блоки: Воспользуйтесь предложенным
					расписанием занятий как блоками времени для выполнения конкретных
					задач. Помните о перерывах и планируйте их использование для отдыха и
					восстановления сил. <br />
					3. Используйте техники фокусировки внимания: Работайте над умением
					концентрироваться на одной задаче, избегая многозадачности. Такой
					подход повышает производительность и качество работы.
					<br /> 4. Пользуйтесь методами управления временем: Один из таких
					методов - техника Помидора, которая предполагает работу в режиме
					25-минутной фокусированной активности с последующим коротким
					перерывом.
					<br /> 5. Постоянное саморазвитие: Развивайте навыки тайм-менеджмента,
					изучайте методики улучшения производительности и применяйте их на
					практике.
				</h1>
			</div>
		</div>
	)
}
