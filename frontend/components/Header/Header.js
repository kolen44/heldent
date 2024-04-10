'use client'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import GreenButton from '../../widgets/GreenButton/GreenButton'
import { TypedTitle } from '../../widgets/Typed/TypedTitle'

export default function Header() {
	const [isUp, setIsUp] = useState(false)
	useEffect(() => {
		const interval = setInterval(() => {
			setIsUp(prevState => !prevState)
		}, 1000) // Изменение направления движения каждую секунду

		return () => clearInterval(interval)
	}, [])
	return (
		<div className='bg-[#0A062A]'>
			<div className='bg-[url(/image.webp)] bg-no-repeat bg-cover text-[#FFF] md:pt-10 md:px-24 flex gap-28'>
				<div className='h-screen   opacity-90 '>
					<div className='text-xl md:text-2xl pb-7 md:pb-9 xl:pb-14 flex justify-center md:justify-start  font-normal'>
						HELDENT
					</div>
					<div className='text-2xl md:text-5xl lg:text-7xl pb-12 font-bold'>
						<h1 className='pb-2 text-center md:text-start'>
							<span className='text-[#D2FF1D] text-4xl md:text-7xl 2xl:text-8xl animate-pulse'>
								Heldent
							</span>{' '}
							- <br></br>
						</h1>
						<h2 className='text-center md:text-start'>
							адаптация для <br></br>
						</h2>
						<h2 className='text-center md:text-start'>
							<TypedTitle />
						</h2>
					</div>
					<div className='max-w-2xl text-center md:text-start pb-24 md:pb-8 xl:pb-24 text-2xl'>
						<p className='leading-11  md:leading-5 font-medium'>
							Стремитесь к успеху в учебе, но чувствуете, что не всегда можете
							эффективно отслеживать свой прогресс? Хотите контролировать свои
							достижения и быть информированными о своих успехах на пути к
							знаниям и навыкам? Тогда Heldent - ваш верный компаньон!
						</p>
					</div>
					<div className='flex items-center justify-center max-w-2xl  md:justify-between '>
						<Link
							href={
								'https://ilyas-organization-8.gitbook.io/helden/bystryi-start'
							}
						>
							<GreenButton text={'Начать'} />
						</Link>

						<div className=' h-fit w-fit py-1 md:py-3 px-1 md:px-10 ml-2 border-2 border-black box-border'>
							<Link href={'https://ilyas-organization-8.gitbook.io/helden'}>
								<h3 className='text-xl md:text-3xl text-[#D2FF1D] font-medium text-center'>
									Узнать больше
								</h3>
							</Link>
						</div>
					</div>
				</div>
				<div className='mt-0 mx-auto brightness-123 hidden xl:block'>
					<motion.div
						animate={{ x: isUp ? -5 : 5, y: isUp ? -5 : 5 }}
						transition={{ duration: 2, loop: Infinity }}
					>
						<Image
							src='/studentwithphone.png'
							width={800}
							height={800}
							alt='Student'
						/>
					</motion.div>
				</div>
			</div>
		</div>
	)
}
