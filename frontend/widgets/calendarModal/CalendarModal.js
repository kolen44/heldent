import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { handlerSendGPTCalendar } from '../../features/ChatGPTCalendar'
import { useStores } from '../../store/useStore'
import GreenButton from '../GreenButton/GreenButton'

export const CalendarModal = () => {
	const [goal, setGoal] = useState('')
	const [subject, setSubject] = useState('')
	const setCalendarPlan = useStores(state => state.setCalendarPlan)
	const [confidenceVisible, setConfidenceVisible] = useState(true)
	async function handlerGenerate() {
		const today = new Date().toISOString().substring(0, 10)
		const createPlanArray = await handlerSendGPTCalendar({
			date: today,
			subject,
			goal,
		})
		const createPlanArrayParsed = await JSON.parse(createPlanArray)
		setCalendarPlan(createPlanArrayParsed)
	}

	return (
		<AnimatePresence>
			{confidenceVisible && (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					onClick={() => setConfidenceVisible(false)}
					className='bg-slate-900/20 backdrop-blur p-8 fixed inset-0 z-50 grid place-items-center cursor-pointer'
				>
					<motion.div
						initial={{ scale: 0, rotate: '12.5deg' }}
						animate={{ scale: 1, rotate: '0deg' }}
						exit={{ scale: 0, rotate: '0deg' }}
						onClick={e => e.stopPropagation()}
						className='bg-gradient-to-br from-violet-600 to-indigo-600 text-white  rounded-lg w-full max-w-lg shadow-xl cursor-default relative overflow-hidden'
					>
						<div className=' flex  justify-center  '>
							<div className='md:-mb-8 p-6 2xl:-mb-0  w-fit px-4  md:px-28  backdrop-blur-3xl min-w-5/6 flex flex-col justify-center rounded-lg shadow-2xl shadow-slate-950 gap-5 '>
								<div className='flex justify-center '>
									<h2 className='font-bold text-5xl  text-center text-[#D9D9D9]'>
										Генерация плана
									</h2>
								</div>
								<div className='pt-7 text-[#D9D9D9] flex flex-col  text-xl gap-4  '>
									<form className='mt-0 flex flex-col gap-8 '>
										<label className='flex flex-col'>
											<div className='grid w-full justify-items-center'>
												<input
													name='предмет'
													placeholder='Предмет'
													className='bg-[#D9D9D9] py-4 px-6 placeholder:text-opacity-50 placeholder:font-thin 2xl:placeholder:text-xl md:w-full w-[90%]   placeholder:text-sm text-[#0A0625] placeholder:text-[#0A0625] rounded-lg outline-none border-none font-medium'
													onChange={e => setSubject(e.target.value)}
												/>
											</div>
										</label>
										<label className='flex flex-col'>
											<div className='grid w-full justify-items-center'>
												<textarea
													rows={5}
													placeholder='Цель изучения'
													className='bg-[#D9D9D9] py-4 px-6 placeholder:text-opacity-50 placeholder:font-thin 2xl:placeholder:text-xl  placeholder:text-sm text-[#0A0625] md:w-full w-[90%]  placeholder:text-[#0A0625] rounded-lg outline-none border-none font-medium'
													onChange={e => setGoal(e.target.value)}
												/>
											</div>
										</label>
									</form>
								</div>

								<div className='flex justify-center mt-5'>
									<button
										type='submit'
										onClick={() => {
											handlerGenerate(), setConfidenceVisible(false)
										}}
									>
										<GreenButton text={'Генерация'} />
									</button>
								</div>
							</div>
						</div>
					</motion.div>
				</motion.div>
			)}
		</AnimatePresence>
	)
}
