import EchartCircleStatistic from '../../../widgets/EchartCircleStatistic/EchartCircleStatistic'
import EchartDayAttendance from '../../../widgets/EchartDayAttendance/EchartDayAttendance'
import EchartStatistic from '../../../widgets/EchartStatistic/EchartStatistic'

export default function Statistic() {
	return (
		<div className='flex flex-col overflow-y-hidden h-100 w-100 text-white'>
			<div className='flex flex-row gap-5'>
				<EchartStatistic />
				<EchartCircleStatistic />
				<EchartDayAttendance />
			</div>
			<div>
				<h1>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis
					facilis, vitae est optio necessitatibus odit, fuga laboriosam rem amet
					obcaecati non tempore sint aperiam voluptatum placeat eum inventore
					provident dicta!
				</h1>
			</div>
		</div>
	)
}
