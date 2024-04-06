import axios from 'axios'
import { NextResponse } from 'next/server'

export const GET = async (req, res) => {
	try {
		const response = await axios.post(`http://localhost:5000/api/user/create`, {
			email: 'Те33х@mвail.ru',
			password: 'f431d2',
		})
		return new NextResponse(response?.data?.message, {
			status: 200,
		})
	} catch (err) {
		console.log(err)
	}
}
