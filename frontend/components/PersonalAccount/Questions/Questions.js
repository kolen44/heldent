'use client'
import { useStores } from '../../../store/useStore'

export default function Questions() {
	const setVideo = useStores(state => state.setVideo)
	return (
		<div className='h-full'>
			<div>
				<nav className='bg-white dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600'>
					<div className='max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4'>
						<a
							href='https://flowbite.com/'
							className='flex items-center space-x-3 rtl:space-x-reverse'
						></a>
						<div className='flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse'>
							<button
								data-collapse-toggle='navbar-sticky'
								type='button'
								className='inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600'
								aria-controls='navbar-sticky'
								aria-expanded='false'
							>
								<span className='sr-only'>Open main menu</span>
								<svg
									className='w-5 h-5'
									aria-hidden='true'
									xmlns='http://www.w3.org/2000/svg'
									fill='none'
									viewBox='0 0 17 14'
								>
									<path
										stroke='currentColor'
										stroke-linecap='round'
										stroke-linejoin='round'
										stroke-width='2'
										d='M1 1h15M1 7h15M1 13h15'
									/>
								</svg>
							</button>
						</div>
						<div
							className='items-center justify-between hidden w-full md:flex md:w-auto md:order-1'
							id='navbar-sticky'
						>
							<ul className='flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700'>
								<li onClick={() => setVideo('location')}>
									<a
										href='#'
										className='block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700'
									>
										Местоположение
									</a>
								</li>
								<li onClick={() => setVideo('aboutprice')}>
									<a
										href='#'
										className='block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700'
									>
										Оплата обучения
									</a>
								</li>
								<li onClick={() => setVideo('events')}>
									<a
										href='#'
										className='block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700'
									>
										Мероприятия
									</a>
								</li>
							</ul>
						</div>
					</div>
				</nav>
			</div>
			<div className='relative flex max-w-[1060px] items-center flex-col w-full h-full'>
				<IframeVideo />
				<h1 className='text-center mb-0'>
					Видео сгенерировано используя искусственный интеллект! При
					необходимости можно встроить (динамическую загрузку видео с любым
					текстом) это в API и внедрить к сервисам ITHub .
				</h1>
			</div>
		</div>
	)
}

function IframeVideo() {
	const video = useStores(state => state.video)
	switch (video) {
		case 'aboutprice':
			return (
				<iframe
					width='1060'
					height='715'
					src='https://app.heygen.com/embeds/05f23b3ab3fc4c00be1cec5f5e9a740e'
					title='HeyGen video player'
					frameborder='0'
					allow='encrypted-media; fullscreen;'
					allowfullscreen
				></iframe>
			)
			break

		case 'events': // if (x === 'value1')
			return (
				<iframe
					width='1060'
					height='715'
					src='https://app.heygen.com/embeds/4aa87c5c3e24475ca954c994132b239f'
					title='HeyGen video player'
					frameborder='0'
					allow='encrypted-media; fullscreen;'
					allowfullscreen
				></iframe>
			)
			break

		case 'location': // if (x === 'value2')
			return (
				<iframe
					width='1060'
					height='715'
					src='https://app.heygen.com/embeds/7a29113f13d24684806a625621ca770b'
					title='HeyGen video player'
					frameborder='0'
					allow='encrypted-media; fullscreen;'
					allowfullscreen
				></iframe>
			)
			break

		default:
			return (
				<iframe
					width='1060'
					height='715'
					src='https://app.heygen.com/embeds/507707ddf9344a6ebc89ab8edea0826d'
					title='HeyGen video player'
					frameborder='0'
					allow='encrypted-media; fullscreen;'
					allowfullscreen
				></iframe>
			)
			break
	}
}
