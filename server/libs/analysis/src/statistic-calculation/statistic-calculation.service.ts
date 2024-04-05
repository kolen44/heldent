import { Injectable } from '@nestjs/common';

@Injectable()
export class StatisticCalculationService {
	public sum = (arr: number[]) => arr.reduce((acc, val) => acc + val, 0);
	public mean = (arr: number[]) => this.sum(arr) / arr.length;

	private calculateCorelation(data1: number[], data2: number[]) {
		if (data1.length !== data2.length)
			throw new Error('Length of data1 must be equal to length of data2');

		const mean1 = this.mean(data1);
		const mean2 = this.mean(data2);

		const numerator = data1.reduce(
			(acc, _, i) => acc + (data1[i] - mean1) * (data2[i] - mean2),
			0,
		);

		const variance1 = data1.reduce(
			(acc, val) => acc + (val - mean1) ** 2,
			0,
		);
		const variance2 = data2.reduce(
			(acc, val) => acc + (val - mean2) ** 2,
			0,
		);

		const denominator = Math.sqrt(variance1 * variance2);

		if (denominator === 0) return 0;

		return numerator / denominator;
	}

	private calculateStandardDeviation(data: number[]) {
		if (data.length === 0) throw new Error('Data has been Array');

		const mean = this.sum(data) / data.length;
		const variance = data.reduce(
			(acc, val) => acc + Math.pow(val - mean, 2),
		);

		return Math.pow((1 / data.length) * variance, 0.5);
	}

	private calculateMidian(data: number[]) {
		data.sort((a, b) => a - b)[data.length / 2];

		if (data.length % 2 === 0) {
			console.log(data[data.length / 2 - 1], data[data.length / 2]);
			return (data[data.length / 2] + data[data.length / 2 + 1]) / 2;
		}

		return data[Math.round(data.length / 2)];
	}

	public corelation(data1: number[], data2: number[]) {
		if (data1.length === 0 || data2.length === 0)
			throw new Error('Data has been Array');

		if (data1.length === data2.length) {
			return this.calculateCorelation(data1, data2);
		} else if (data1.length > data2.length) {
			console.warn('Data1 length is greater than Data2 length');
			return this.calculateCorelation(
				data1.slice(data1.length - data2.length, data1.length),
				data2,
			);
		} else if (data1.length < data2.length) {
			console.warn('Data1 length is less than Data2 length');
			return this.calculateCorelation(
				data1,
				data2.slice(data2.length - data1.length, data2.length),
			);
		}

		return undefined;
	}

	public standardDeviation(data: number[]) {
		if (data.length === 0) throw new Error('Data has been Array');
		return this.calculateStandardDeviation(data);
	}

	public midian(data: number[]) {
		if (data.length === 0) throw new Error('Data has been Array');
		return this.calculateMidian(data);
	}
}
