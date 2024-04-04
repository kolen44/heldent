import Image from 'next/image'
import AbilityCard from '../../widgets/AbilityCard.js/AbilityCard'

export function Course() {
	return (
		<div className='h-screen bg-[url(/image3.webp)] flex items-center justify-between bg-no-repeat bg-cover mt-20 md:mt-0'>
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
					<div className='text-5xl md:text-6xl text-[#FFF]'>
						<h2>
							<span className='text-[#D2FF1D] text-6xl md:text-7xl text-start'>
								Посмотри
							</span>{' '}
							<br></br>
							интересные онлайн<br></br> курсы по обучению
						</h2>
					</div>
					<div className='flex flex-col md:flex-row gap-10 items-center'>
						<AbilityCard text={'Обучающее видео'} img={'/video.webp'} />
						<AbilityCard text={'Обучающее видео'} img={'/video.webp'} />
					</div>
				</div>
			</div>
		</div>
	)
}
