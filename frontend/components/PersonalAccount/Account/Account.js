'use client'

import Image from 'next/image'
import { useState } from 'react'
import GreenButton from '../../../widgets/GreenButton/GreenButton'

export default function Account() {
	function handlerSubmit() {
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
		newDivElement.className = 'p-10 eee flex gap-5'

		// Создаем изображение
		var imageElement = document.createElement('img')
		imageElement.src = '/yandex.png'
		imageElement.width = 50
		imageElement.height = 50
		imageElement.alt = 'Yandex'

		// Создаем заголовок h2
		var h2Element = document.createElement('h2')
		h2Element.innerHTML =
			'Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia quas, repudiandae sesukai.'

		// Добавляем изображение и заголовок в div
		newDivElement.appendChild(imageElement)
		newDivElement.appendChild(h2Element)

		// Добавляем новый div в блок с ID "chat"
		chatElement.appendChild(newDivElement)
	}
	const [isLogin, setIsLogin] = useState(false)
	return (
		<div className=' h-full  '>
			<div className='  h-full w-100 text-white-400 overflow-hidden flex flex-col justify-between '>
				<div
					className='w-full mt-0 flex flex-col gap-10 h-1/2  overflow-y-auto  relative'
					id='chat'
				>
					<div className='p-10  flex gap-5'>
						<Image src='/yandex.png' width={50} height={50} alt='Yandex' />
						<h2>
							Обученная нейросеть яндекса совместно с Heldent ответит на любой
							ваш запрос . Нужно только пожелать ... И все обязательно сбудется
							! Начинайте диалог!
						</h2>
					</div>
				</div>
				<div className='flex mb-0 w-full p-20 bg-[#3422] fixed h-full items-end'>
					<div className='flex  w-full gap-20'>
						<div onClick={handlerSubmit}>
							<GreenButton text={'Отправить'} />
						</div>
						<div className='grid w-full justify-items-start'>
							<input
								type='text'
								name='name'
								placeholder='Введите сообщение'
								className='bg-[#D9D9D9]  py-4 px-6 placeholder:font-thin  placeholder:text-sm text-[#0A0625] w-1/2 placeholder:text-opacity-50 2xl:placeholder:text-xl placeholder:text-[#0A0625] rounded-lg outline-none border-none font-medium'
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
