import Image from 'next/image'
import AbilityCard from '../../widgets/AbilityCard.js/AbilityCard'

export default function Abilities() {
	return (
		<div className='bg-[#0A062A]'>
			<div className='bg-[url(/image2.webp)] bg-no-repeat bg-cover h-fit opacity-90'>
				<div className='absolute'>
					<Image src='/planet1.webp' width={200} height={200} alt='Student' />
				</div>

				<div className='text-5xl text-center text-[#FFF] pt-20'>
					<h2 className='text-end sm:text-center'>Что умеет</h2>
					<h2>
						Делать Heldent <span className='text-[#D2FF1D]'>?</span>
					</h2>
				</div>
				<div className='flex items-center md:items-start flex-col md:flex-row md:justify-between md:px-28  mt-52 relative gap-5'>
					<AbilityCard
						text={'Произведет анализ показателей по каждому предмету'}
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
