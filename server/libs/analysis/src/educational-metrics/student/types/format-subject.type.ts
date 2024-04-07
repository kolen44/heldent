import { Subject } from './subject.type';

export type CompletedSubject = Subject & {
	name: string;
	performance: {
		date: Date;
		performance: number;
	}[];
	performanceIndex: number;
};
