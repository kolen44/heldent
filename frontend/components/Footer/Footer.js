import Image from 'next/image'
import Form from '../../widgets/Form/Form'

export default function Footer() {
	return (
		<div className='h-fit min-h-[117vh] md:min-h-[122vh] bg-[url(/footer.webp)] bg-no-repeat bg-cover text-[#FFF] overflow-hidden'>
			<div className=' pt-20 w-screen justify-center text-center flex-col absolute hidden sm:flex'>
				<div className='text-[#D2FF1D] text-4xl  md:text-5xl'>
					Остались вопросы?
				</div>
				<div className='text-3xl hidden lg:block md:text-4xl '>
					Свяжитесь с нами!
				</div>
			</div>
			<div className='absolute mt-28  h-full flex items-end'>
				<Form />
			</div>
			<div className='relative lg:absolute hidden md:flex  -z-1 w-screen  items-start justify-end'>
				<Image
					src='/footerplanet1.webp'
					width={350}
					height={350}
					alt='Planet'
				/>
			</div>
			<div className='absolute -z-1 w-screen  justify-start pt-20 hidden lg:flex'>
				<Image src='/chat3d.webp' width={400} height={400} alt='Planet' />
			</div>
			<div className='absolute -z-1 h-screen  w-screen justify-end pr-32 items-end hidden lg:flex'>
				<Image src='/email3d.webp' width={400} height={400} alt='Planet' />
			</div>
		</div>
	)
}
