'use client'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin, { Draggable } from '@fullcalendar/interaction'
import FullCalendar from '@fullcalendar/react'
import timeGridPlugin from '@fullcalendar/timegrid'
import { Dialog, Transition } from '@headlessui/react'
import { ExclamationTriangleIcon } from '@heroicons/react/24/solid'
import { Fragment, useEffect, useState } from 'react'

export default function Calendar() {
	const [events, setEvents] = useState([
		{ title: 'event 1', id: '1' },
		{ title: 'event 2', id: '2' },
		{ title: 'event 3', id: '3' },
		{ title: 'event 3', id: '4' },
		{ title: 'event 3', id: '5' },
		{ title: 'event 3', id: '6' },
	])
	const [allEvents, setAllEvents] = useState([])
	const [showModal, setShowModal] = useState(false)
	const [showDeleteModal, setDeleteShowModal] = useState(false)
	const [idToDelete, setIdToDelete] = useState(null)
	const [newEvent, setNewEvent] = useState({
		title: '',
		start: '',
		allDay: false,
		id: 0,
	})

	useEffect(() => {
		let draggableEl = document.getElementById('draggable-el')
		if (draggableEl) {
			new Draggable(draggableEl, {
				itemSelector: '.fc-event',
				eventData: function (eventEl) {
					let title = eventEl.getAttribute('title')
					let id = eventEl.getAttribute('data')
					let start = eventEl.getAttribute('start')
					return { title, id, start }
				},
			})
		}
	}, [])

	function handleDateClick(arg) {
		setNewEvent({
			...newEvent,
			start: arg.date,
			allDay: arg.allDay,
			id: new Date().getTime(),
		})
		setShowModal(true)
	}

	function addEvent(data) {
		console.log(data)
		const event = {
			...newEvent,
			start: data.date.toISOString(),
			title: data.draggedEl.innerText,
			allDay: data.allDay,
			id: new Date().getTime(),
		}

		setAllEvents([...allEvents, event])
	}

	function handleDeleteModal(data) {
		setDeleteShowModal(true)
		setIdToDelete(Number(data.event.id))
	}

	function handleDelete() {
		setAllEvents(
			allEvents.filter(event => Number(event.id) !== Number(idToDelete))
		)
		setDeleteShowModal(false)
		setIdToDelete(null)
	}

	function handleCloseModal() {
		setShowModal(false)
		setNewEvent({
			title: '',
			start: '',
			allDay: false,
			id: 0,
		})
		setDeleteShowModal(false)
		setIdToDelete(null)
	}

	return (
		<div className='bg-white flex flex-col min-h-screen  items-center justify-between p-24'>
			<div className='grid grid-cols-10'>
				<div className='col-span-8'>
					<FullCalendar
						plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
						headerToolbar={{
							left: 'prev.next,today',
							center: 'title',
							right: 'resourceTimelineWook, dayGridMonth, timeGridWeek',
						}}
						events={allEvents}
						nowIndicator={true}
						editable={true}
						droppable={true}
						selectable={true}
						selectMirror={true}
						dateClick={handleDateClick}
						drop={data => addEvent(data)}
						eventClick={data => handleDeleteModal(data)}
					/>
				</div>
				<div
					id='draggable-el'
					className='ml-8 w-full border-2 p-2 mt-16 rounded-md lg:h-1/2 bg-violet-500'
				>
					<h1 className='font-bold text-lg text-center'>Drag event</h1>
					{events.map(event => (
						<div
							className='fc-event border-2 p-1 m-2 w-full rounded-md ml-auto flex justify-center items  text-center bg-white'
							title={event.title}
							key={event.id}
						>
							{event.title}
						</div>
					))}
				</div>
			</div>
			<Transition.Root show={showDeleteModal} as={Fragment}>
				<Dialog as='div' className='relative z-10' onClose={setDeleteShowModal}>
					<Transition.Child
						as={Fragment}
						enter='ease-out duration-300'
						enterFrom='opacity-0'
						enterTo='opacity-100'
						leave='ease-in duration-200'
						leaveFrom='opacity-100'
						leaveTo='opacity-0'
					>
						<div className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity' />
					</Transition.Child>
					<div className='fixed inset-0 z-10 overflow-y-auto'>
						<div className='flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0'>
							<Transition.Child
								as={Fragment}
								enter='ease-out duration-300'
								enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
								enterTo='opacity-100 translate-y-0 sm:scale-100'
								leave='ease-in duration-200'
								leaveFrom='opacity-100 translate-y-0 sm:scale-100'
								leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
							>
								<Dialog.Panel className='relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg'>
									<div className='bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4'>
										<div className='sm:flex sm:items-start'>
											<div className='mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10'>
												<ExclamationTriangleIcon
													className='w-6 h-6 text-red-600'
													aria-hidden={true}
												></ExclamationTriangleIcon>
											</div>
											<div className='mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left'>
												<Dialog.Title
													as='h3'
													className='text-base font-semibold leading-6 text-gray-900'
												>
													Удалить событие
												</Dialog.Title>
												<div className='mt-2'>
													<p className='text-sm text-gray-500'>
														Вы действительно хотите это удалить?
													</p>
												</div>
											</div>
										</div>
									</div>
									<div className='bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6'>
										<button
											type='button'
											className='inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto'
											onClick={handleDelete}
										>
											Удалить
										</button>
										<button
											type='button'
											className='inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-black shadow-sm ring-1 ring-inset ring-gray-300 sm:mt-0 sm:w-auto'
											onClick={handleCloseModal}
										>
											Отмена
										</button>
									</div>
								</Dialog.Panel>
							</Transition.Child>
						</div>
					</div>
				</Dialog>
			</Transition.Root>
		</div>
	)
}
