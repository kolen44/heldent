import Image from 'next/image'

export default function AbilityCard({ img, text }) {
	return (
		<div className='py-8 px-8 bg-[#30284A] backdrop-blur-3xl  bg-[#30284A]/50 max-w-64 flex flex-col justify-center rounded-lg shadow-2xl shadow-slate-950 '>
			<div className='flex justify-center '>
				<Image src={img} width={100} height={100} alt='Card' />
			</div>

			<div className='pt-7 text-[#FFF] text-xl'>{text}</div>
		</div>
	)
}
