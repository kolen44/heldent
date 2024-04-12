export class CreateSubjectDto {
	email: string;
	gradesIds: number[];
	attendancesIds: number[];
	studentsIds: number[];

	constructor() {}
}
