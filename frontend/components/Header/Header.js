import Image from 'next/image'
import GreenButton from '../../widgets/GreenButton/GreenButton'

export default function Header() {
	return (
		<div className='bg-[#0A062A]'>
			<div className='bg-[url(/image.webp)] bg-no-repeat bg-cover text-[#FFF] md:pt-10 md:px-24 flex'>
				<div className='h-screen   opacity-90 '>
					<div className='text-xl md:text-2xl pb-7 md:pb-9 xl:pb-14 flex justify-center md:justify-start'>
						HELDENT
					</div>
					<div className='text-2xl md:text-7xl pb-12 md:pb-0'>
						<h1 className='pb-2 text-center md:text-start'>
							<span className='text-[#D2FF1D] text-4xl md:text-7xl '>
								Heldent
							</span>{' '}
							- <br></br>
						</h1>
						<h2 className='text-center md:text-start'>
							адаптация для <br></br>
						</h2>
						<h2 className='text-center md:text-start'>
							студентов<br></br>
						</h2>
						<h2 className='text-center md:text-start'>
							университета<br></br>
						</h2>
					</div>
					<div className='max-w-2xl text-center md:text-start pb-24 md:pb-8 xl:pb-24 '>
						<p className='leading-7 md:leading-5'>
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam
							porro repudiandae nulla velit architecto quis perferendis libero
							esse magnam totam! Impedit velit beatae sunt voluptatem natus. Id
							placeat alias odio.
						</p>
					</div>
					<div className='flex items-center justify-center max-w-2xl  md:justify-between '>
						<GreenButton text={'Начать'} />
						<div className=' h-fit w-fit py-1 md:py-3 px-5 md:px-10 ml-5 border-2 border-black box-border'>
							<h3 className='text-xl md:text-3xl text-[#D2FF1D] '>
								Узнать больше
							</h3>
						</div>
					</div>
				</div>
				<div className='ml-0 mt-0 brightness-123 hidden md:block'>
					<Image
						src='/studentwithphone.png'
						width={700}
						height={700}
						alt='Student'
					/>
				</div>
			</div>
		</div>
	)
}
