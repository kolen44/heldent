import Image from 'next/image'
import Form from './Form/Form'

export function Recommendations() {
	return (
		<div className='h-fit overflow-hidden min-h-screen bg-[url(/picks.webp)] bg-no-repeat bg-cover opacity-90 text-[#FFF] '>
			<div className='flex absolute  flex-col justify-center text-center pt-20'>
				<div className='text-2xl md:text-4xl '>
					<span className='text-[#D2FF1D] '>Heldent</span> предоставит вам{' '}
					<br></br> персональные рекомендации
				</div>
				<div className='flex justify-center pt-20'>
					<Form />
				</div>
			</div>
			<div className='absolute w-screen flex justify-end mt-96 -z-1'>
				<Image src='/planet2.webp' width={400} height={400} alt='Student' />
			</div>
		</div>
	)
}
