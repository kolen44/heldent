import GreenButton from '../GreenButton/GreenButton'

export default function Form() {
	return (
		<div className='w-screen relative  flex justify-center z-10 '>
			<div className='py-8 w-fit px-4  md:px-28 bg-[#30284A] backdrop-blur-3xl  bg-[#30284A]/50 min-w-5/6 flex flex-col justify-center rounded-lg shadow-2xl shadow-slate-950 gap-5 '>
				<div className='flex justify-center '>
					<h2 className='font-bold text-5xl text-center text-[#D9D9D9]'>
						Связаться с нами
					</h2>
				</div>
				<div className='pt-7 text-[#D9D9D9] flex flex-col  text-xl gap-4  '>
					<form className='mt-0 flex flex-col gap-8 '>
						<label className='flex flex-col justify-center'>
							<div className='grid w-full justify-items-center'>
								<input
									type='text'
									name='name'
									placeholder='Ф.И.О.'
									className='bg-[#D9D9D9] md:w-full w-[90%] py-4 px-6 placeholder:font-thin  placeholder:text-sm text-[#0A0625] placeholder:text-opacity-50 placeholder:text-[#0A0625] rounded-lg outline-none border-none font-medium'
								/>
							</div>
						</label>
						<label className='flex flex-col'>
							<div className='grid w-full justify-items-center'>
								<input
									type='email'
									name='email'
									placeholder='Email'
									className='bg-[#D9D9D9] py-4 px-6 placeholder:text-opacity-50 placeholder:font-thin md:w-full w-[90%]   placeholder:text-sm text-[#0A0625] placeholder:text-[#0A0625] rounded-lg outline-none border-none font-medium'
								/>
							</div>
						</label>
						<label className='flex flex-col'>
							<div className='grid w-full justify-items-center'>
								<textarea
									rows={5}
									name='message'
									placeholder='Сообщение'
									className='bg-[#D9D9D9] py-4 px-6 placeholder:text-opacity-50 placeholder:font-thin  placeholder:text-sm text-[#0A0625] md:w-full w-[90%]  placeholder:text-[#0A0625] rounded-lg outline-none border-none font-medium'
								/>
							</div>
						</label>
					</form>
				</div>

				<div className='flex justify-center mt-5'>
					<button type='submit'>
						<GreenButton text={'Отправить'} />
					</button>
				</div>
			</div>
		</div>
	)
}
