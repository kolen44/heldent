'use client'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import GreenButton from '../../widgets/GreenButton/GreenButton'
import ParallaxScroller from '../../widgets/ParallaxScroller/ParallaxScroller'

export function Recommendations() {
	const [isHover, setIsHover] = useState(false)
	const [isUp, setIsUp] = useState(false)
	useEffect(() => {
		const interval = setInterval(() => {
			setIsUp(prevState => !prevState)
		}, 1000) // Изменение направления движения каждую секунду

		return () => clearInterval(interval)
	}, [])
	return (
		<div className='h-fit overflow-hidden min-h-screen bg-[url(/picks.webp)] bg-no-repeat bg-cover opacity-90 text-[#FFF] '>
			<div className='flex absolute w-screen  flex-col justify-center text-center pt-20'>
				<div className='text-2xl md:text-4xl '>
					<span className='text-[#D2FF1D] '>Heldent</span> рекомендует вам{' '}
					<br></br> использовать API!
				</div>
				<div className='flex justify-center pt-20'>
					<Link href={'https://ilyas-organization-8.gitbook.io/helden'}>
						<GreenButton text={'К документации'} />
					</Link>
				</div>
				<div className='mt-28  md:mt-36'>
					<ParallaxScroller />
				</div>
			</div>
			<div className='absolute w-screen flex justify-end mt-96 -z-1'>
				<motion.div
					animate={{ y: isUp ? -10 : 10 }}
					transition={{ duration: 1, loop: Infinity }}
				>
					<Image src='/planet2.webp' width={400} height={400} alt='Student' />
				</motion.div>
			</div>
		</div>
	)
}
