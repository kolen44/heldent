'use client'
import dynamic from 'next/dynamic'
import { Suspense, useState } from 'react'
import ChangeStatisticPageButton from '../../../widgets/changeStatisticPageButton/changeStatisticPageButton'
import '../globals.css'

export default function Account() {
	const [pageNumber, setPageNumber] = useState(1)
	const Component = SelectedComponent(pageNumber)
	return (
		<div className='bg-[#0A062A] max-h-screen overflow-hidden'>
			<div className='grid grid-cols-10 h-screen w-screen p-20 pr-28 pl-7 text-white bg-[url(/image.webp)] bg-no-repeat bg-cover'>
				<div className='col-span-2 '>
					<div className='text-md pt-10 text-5xl text-center'>Heldent</div>
					<div className='text-xl h-full flex items-center justify-center'>
						<div className='flex flex-col gap-10'>
							<div onClick={() => setPageNumber(1)}>
								<ChangeStatisticPageButton text={'Личный кабинет'} />
							</div>
							<div onClick={() => setPageNumber(2)}>
								<ChangeStatisticPageButton text={'Статистика'} />
							</div>

							<div onClick={() => setPageNumber(3)}>
								<ChangeStatisticPageButton text={'Календарь'} />
							</div>
						</div>
					</div>
				</div>
				<div className='bg-[#0A062A] h-full col-span-8 rounded-xl backdrop-blur-md'>
					<Suspense fallback={<div>Loading...</div>}>
						<Component />
					</Suspense>
				</div>
			</div>
		</div>
	)
}

function SelectedComponent(number) {
	const componentStatistic = dynamic(() =>
		import('@components/PersonalAccount/Statistic/Statistic')
	)
	const componentCalendar = dynamic(() =>
		import('@components/PersonalAccount/Calendar/Calendar')
	)

	const componentsMap = {
		1: componentStatistic,
		2: componentStatistic,
		3: componentCalendar,
	}
	const SelectedComponent = componentsMap[number] || null
	return SelectedComponent
}