export type Subject = {
	name: string;
	grades: { date: Date; grade: number }[];
	attendances: { date: Date; attendance: number }[];
};
