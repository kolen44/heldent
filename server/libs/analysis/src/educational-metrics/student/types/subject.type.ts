export type Subject = {
	name: string;
	grades: { date: Date; grade: number }[];
	attendance: { date: Date; attendance: number }[];
};
