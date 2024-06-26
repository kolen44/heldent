'use client'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { Suspense, useState } from 'react'
import ChangeStatisticPageButton from '../../../widgets/changeStatisticPageButton/changeStatisticPageButton'
import '../globals.css'

export default function Account() {
	const [pageNumber, setPageNumber] = useState(1)
	const Component = SelectedComponent(pageNumber)
	return (
		<div className='bg-[#0A062A] xl:max-h-screen overflow-hidden'>
			<div className='grid grid-cols-10 h-screen w-screen xl:p-20 xl:pr-28 xl:pl-7 text-white bg-[url(/image.webp)] bg-no-repeat bg-cover '>
				<div className='col-span-2 hidden xl:flex justify-center'>
					<button className='text-md absolute pt-10 z-50 text-5xl text-center'>
						<div>
							<Link href={'/'}>Heldent</Link>
						</div>
					</button>
					<div className='text-xl h-full flex items-center justify-center fixed '>
						<div className='flex flex-col gap-10'>
							<div onClick={() => setPageNumber(1)}>
								<ChangeStatisticPageButton text={'Личный кабинет'} />
							</div>
							<div onClick={() => setPageNumber(2)}>
								<ChangeStatisticPageButton text={'Расписание'} />
							</div>

							<div onClick={() => setPageNumber(3)}>
								<ChangeStatisticPageButton text={'Календарь'} />
							</div>

							<div onClick={() => setPageNumber(4)}>
								<ChangeStatisticPageButton text={'Частые вопросы'} />
							</div>
						</div>
					</div>
				</div>
				<div className='bg-[#544e88] h-full  w-screen xl:w-fit col-span-8 rounded-xl backdrop-blur-md mr-20'>
					<Suspense fallback={<div>Loading...</div>}>
						<Component />
					</Suspense>
				</div>
			</div>
		</div>
	)
}

function SelectedComponent(number) {
	const componentAccount = dynamic(() =>
		import('@components/PersonalAccount/Account/Account')
	)
	const componentStatistic = dynamic(() =>
		import('@components/PersonalAccount/Statistic/Statistic')
	)
	const componentCalendar = dynamic(() =>
		import('@components/PersonalAccount/Calendar/Calendar')
	)
	const componentQuestions = dynamic(() =>
		import('@components/PersonalAccount/Questions/Questions')
	)

	const componentsMap = {
		1: componentAccount,
		2: componentStatistic,
		3: componentCalendar,
		4: componentQuestions,
	}
	const SelectedComponent = componentsMap[number] || null
	return SelectedComponent
}
