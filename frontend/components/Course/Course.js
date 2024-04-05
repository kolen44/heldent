import Image from 'next/image'
import Link from 'next/link'
import AbilityCard from '../../widgets/AbilityCard.js/AbilityCard'

export function Course() {
	return (
		<div className='h-fit md:h-screen bg-[url(/image3.webp)] flex items-center justify-between bg-no-repeat bg-cover mt-20 md:mt-0'>
			<div className='w-full flex justify-center md:justify-between'>
				<div className='-z-1 hidden md:block brightness-130'>
					<Image
						src='/girlwithphone.webp'
						width={600}
						height={600}
						alt='Student'
					/>
				</div>
				<div className='md:p-20 md:pr-40 mr-0 flex flex-col gap-20 text-center md:text-start w-fit'>
					<div className='text-4xl md:text-5xl text-[#FFF]'>
						<h2>
							<span className='text-[#D2FF1D] text-5xl md:text-7xl text-start'>
								Посмотри
							</span>{' '}
							<br></br>
							интересные онлайн<br></br> курсы по обучению
						</h2>
					</div>
					<div className='flex flex-col md:flex-row gap-10 items-center'>
						<AbilityCard
							text={
								<Link href={'https://youtu.be/ioKLrNt8KYs?si=MrvoHXUEyWwVdZ7l'}>
									<span className='text-center'>
										Обучающее видео<br></br>
										<br></br>
										<h3 className='text-sm text-[#D2FF1D]'>Подробнее...</h3>
									</span>
								</Link>
							}
							img={'/video.webp'}
						/>
						<AbilityCard
							text={
								<Link href={'https://youtu.be/t6WkXF7UxDc?si=72lwZU15B3cZWIth'}>
									<span className='text-center'>
										Обучающее видео<br></br>
										<br></br>
										<h3 className='text-sm text-[#D2FF1D]'>Подробнее...</h3>
									</span>
								</Link>
							}
							img={'/video.webp'}
						/>
					</div>
				</div>
			</div>
		</div>
	)
}
