import Abilities from '../../components/Abilities/Abilities'
import Course from '../../pages/Course/Course'
import HeaderPage from '../../pages/Header/Header'
import Recommendations from '../../pages/Recommedations/Recommendatons'

export default function Home() {
	return (
		<div className='bg-[#0A062A]'>
			<HeaderPage />
			<Abilities />
			<Recommendations />
			<Course />
		</div>
	)
}
