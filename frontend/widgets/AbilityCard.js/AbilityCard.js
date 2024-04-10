import Image from 'next/image'

export default function AbilityCard({ img, text }) {
	return (
		<div className='p-8 2xl:py-20  bg-[#30284A] backdrop-blur-3xl  bg-[#30284A]/50 w-64  2xl:w-96 flex flex-col justify-center items-center rounded-lg shadow-2xl shadow-slate-950 pb-10'>
			<div className='flex justify-center '>
				<Image src={img} width={170} height={152} alt='Card' />
			</div>

			<div className='pt-7 text-[#FFF] text-center text-3xl md:text-3xl'>
				{text}
			</div>
		</div>
	)
}
