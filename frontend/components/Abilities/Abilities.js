'use client'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import AbilityCard from '../../widgets/AbilityCard.js/AbilityCard'

export default function Abilities() {
	const [isUp, setIsUp] = useState(false)
	useEffect(() => {
		const interval = setInterval(() => {
			setIsUp(prevState => !prevState)
		}, 1000) // Изменение направления движения каждую секунду

		return () => clearInterval(interval)
	}, [])
	return (
		<div className='bg-[#0A062A]'>
			<div className='bg-[url(/image2.webp)] bg-no-repeat bg-cover h-fit opacity-90 min-h-screen'>
				<div className='absolute'>
					<motion.div
						animate={{ y: isUp ? -20 : 20 }}
						transition={{ duration: 1, loop: Infinity }}
					>
						<Image src='/planet1.webp' width={200} height={200} alt='Student' />
					</motion.div>
				</div>

				<div className='text-3xl md:text-5xl 2xl:text-7xl text-center text-[#FFF] pt-20'>
					<h2 className='text-end sm:text-center'>Что умеет</h2>
					<h2>
						Делать Heldent <span className='text-[#D2FF1D]'>?</span>
					</h2>
				</div>
				<div className='flex items-center md:items-start flex-col md:flex-row md:justify-between md:px-28 pb-10  mt-52 relative gap-5'>
					<AbilityCard
						text={
							'Произведет анализ показателей по каждому предмету и не только'
						}
						img={'/blank.webp'}
					/>
					<AbilityCard
						text={
							'Поможет посчитать и вывести средний балл по каждому из предметов'
						}
						img={'/calculator.webp'}
					/>
					<AbilityCard
						text={'Даст оценку связи между частотой посещений и успеваемостью'}
						img={'/loudspeaker.webp'}
					/>
				</div>
				<div></div>
			</div>
		</div>
	)
}
