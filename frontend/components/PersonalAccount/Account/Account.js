'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { ToastContainer } from 'react-toastify'
import { yandexGPTChat } from '../../../features/YandexChat'

export default function Account() {
	const [text, setText] = useState('')
	const [role, setRole] = useState('assistant')
	const [yandexGreeting, setYandexGreeting] = useState(
		'Обученная нейросеть яндекса совместно с Heldent ответит на любой вопрос и поможет в любой ситуации!'
	)
	const [show, setShow] = useState('')
	async function handlerSubmit() {
		if (text.length < 2) {
			return setYandexGreeting(
				'Пожалуйста , введите больше текста ! Помните - чем больше текста тем качественнее будет сгенерированный ответ от нашей обученной модели YandexGPT'
			)
		} else {
			setYandexGreeting(
				'Спасибо что пользуетесь нейросетью мы это очень ценим и благодарим Вас! Надеемся что вы продолжаете взаимодействовать с нашим продуктов и дальше'
			)
		}
		const response = await (await yandexGPTChat({ role, text })).json()
		console.log(response)
		var eeeElement = document.querySelector('#chat .eee')

		// Проверяем, существует ли элемент с классом "eee"
		if (eeeElement) {
			// Удаляем элемент из DOM
			eeeElement.remove()
		}
		// Получаем элемент с ID "chat"
		var chatElement = document.getElementById('chat')

		// Создаем новый элемент div
		var newDivElement = document.createElement('div')
		newDivElement.className = 'px-10 eee flex items-center gap-5'

		// Создаем изображение
		var imageElement = document.createElement('img')
		imageElement.src = '/yandex.png'
		imageElement.width = 50
		imageElement.height = 50
		imageElement.alt = 'Yandex'

		// Создаем заголовок h2
		var h2Element = document.createElement('h2')
		h2Element.innerHTML = await response.text

		// Добавляем изображение и заголовок в div
		newDivElement.appendChild(imageElement)
		newDivElement.appendChild(h2Element)

		// Добавляем новый div в блок с ID "chat"
		chatElement.appendChild(newDivElement)
	}
	const [isLogin, setIsLogin] = useState(false)
	return (
		<div className=' h-full  '>
			<Link href={'/'} className='absolute w-full z-50'>
				<h2 className=' text-center  text-[#884e94]'>На главную</h2>
			</Link>

			<ToastContainer />
			<div className='  h-full w-100 text-white-400 overflow-hidden flex flex-col justify-between '>
				<div
					className='w-full mt-10 flex flex-col gap-10 h-1/2  overflow-y-auto  relative'
					id='chat'
				>
					<div className='xl:p-10 flex items-center gap-5'>
						<Image src='/yandex.png' width={50} height={50} alt='Yandex' />
						<h2>
							{yandexGreeting}. Текущая роль - {role}
						</h2>
					</div>
				</div>
				<div className='flex mb-0 w-full xl:p-20 bg-[#3422] fixed h-full items-end'>
					<div className='flex px-2 mb-5 xl:mb-0 w-full items-center gap-2 xl:gap-20'>
						<div onClick={handlerSubmit}>
							<div
								className={`bg-[#D2FF1D] h-fit w-fit py-3 px-3 duration-300 `}
							>
								<h3 className='text-sm md:text-lg 2xl:text-2xl text-black font-medium'>
									Отправить
								</h3>
							</div>
						</div>
						<div className='flex w-full justify-between gap-10'>
							<input
								type='text'
								name='text'
								value={text}
								onChange={e => setText(e.target.value)}
								placeholder='Введите сообщение'
								className='bg-[#D9D9D9] w-full py-4 px-6 placeholder:font-thin  placeholder:text-sm text-[#0A0625] placeholder:text-opacity-50 2xl:placeholder:text-xl placeholder:text-[#0A0625] rounded-lg outline-none border-none font-medium'
							/>
							<div className='hidden 2xl:inline-flex z-10 gap-1 shadow-sm'>
								<button
									className='px-4 cursor-pointer rounded-md py-2 text-sm font-medium text-blue-700 bg-white border border-gray-200 rounded-s-lg hover:bg-gray-100 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white'
									onClick={() => setRole('assistant')}
								>
									Assistant
								</button>
								<button
									className='px-4 cursor-pointer rounded-md py-2 text-sm font-medium text-blue-700 bg-white border border-gray-200 rounded-s-lg hover:bg-gray-100 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white'
									onClick={() => setRole('psychologist')}
								>
									Psychologist
								</button>
								<button
									className='px-4 cursor-pointer rounded-md py-2 text-sm font-medium text-blue-700 bg-white border border-gray-200 rounded-s-lg hover:bg-gray-100 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white'
									onClick={() => setRole('programmer')}
								>
									Programmer
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
