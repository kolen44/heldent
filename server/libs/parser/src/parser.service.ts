import { Injectable } from '@nestjs/common';
import axios from 'axios';
import cheerio from 'cheerio';

@Injectable()
export class ParserService {
	// Send an async HTTP Get request to the url
	async parsePage() {
		const AxiosInstance = await axios.create();
		AxiosInstance.get('https://iis.bsuir.by/rating-of-students')
			.then(
				// Once we have data returned ...
				(response) => {
					const html = response.data; // Get the HTML from the HTTP request
					const $ = cheerio.load(html); // Load the HTML string into cheerio
					const statsTable = $('.Rating_negativeAverageShift__1LNAy'); // Parse the HTML and extract just whatever code contains .statsTableContainer and has tr inside
					console.log(statsTable); // Log the number of captured elements
				},
			)
			.catch(console.error);
	}
}
