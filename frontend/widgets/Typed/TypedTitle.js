'use client'
import { useEffect, useRef } from 'react'
import Typed from 'typed.js'

export const TypedTitle = () => {
	const el = useRef(null)
	useEffect(() => {
		const typed = new Typed(el.current, {
			strings: ['студентов <br> университета', 'школьников', 'учителей'],
			startDelay: 300,
			typeSpeed: 70,
			backSpeed: 70,
			backDelay: 300,
			loop: true,
		})

		// Destroying
		return () => {
			typed.destroy()
		}
	}, [])
	return (
		<div>
			<span ref={el}></span>{' '}
		</div>
	)
}
