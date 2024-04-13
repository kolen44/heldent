import axios from 'axios'
import { NextResponse } from 'next/server'

export const POST = async function handler(req) {
	const data = await req.json()
	try {
		const response = await axios.post(
			`http://localhost:5000/api/student/assistant`,
			{
				role: data.role,
				question: data.text,
			}
		)
		return new NextResponse(JSON.stringify(response.data), {
			status: 200,
		})
	} catch (err) {
		const request = JSON.parse(data)
		handler(request)
	}
}
