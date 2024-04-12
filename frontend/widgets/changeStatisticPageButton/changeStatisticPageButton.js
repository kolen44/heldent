'use client'
import { motion } from 'framer-motion'
import { useState } from 'react'

export default function ChangeStatisticPageButton({ text }) {
	const colors = ['#312942', '#453E55']
	const [currentColor, setCurrentColor] = useState(0)

	const handleButtonClick = () => {
		setCurrentColor(currentColor === colors.length - 1 ? 0 : currentColor + 1)
	}
	return (
		<motion.button
			whileHover={{ scale: 1.1 }}
			whileTap={{ scale: 0.9 }}
			style={{
				color: 'white',
				background: colors[currentColor],
				border: 'none',
				borderRadius: '5px',
				boxShadow: '0 0 10px rgba(80, 75, 95, 0.5)',
				backdropFilter: 'blur(5px)',
				padding: '15px',
			}}
			onClick={handleButtonClick}
		>
			{text}
		</motion.button>
	)
}
