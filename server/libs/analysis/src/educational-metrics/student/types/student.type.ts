import { Subject } from './subject.type';

export type Student = {
	name: string;
	subjects: Record<string, Subject>;
};
