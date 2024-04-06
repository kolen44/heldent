import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddUsers1712402545655 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		console.log(1);
		await queryRunner.query(`
            INSERT INTO subject (name) VALUES 
            ('math'), 
            ('history'),
            ('geography'),
            ('physics'),
            ('chemistry');
        `);
		await queryRunner.query(`
            INSERT INTO "student" (email, password) VALUES ('john@example.com', 'password');
        `);

		const subjects = await queryRunner.query(`
            SELECT * FROM subject WHERE name in ('math', 'history');
        `);

		const students = await queryRunner.query(`
            SELECT * FROM "student" WHERE email = 'john@example.com';
        `);

		console.log(students, subjects);

		await queryRunner.query(
			`
            INSERT INTO grade ("date", "grade", "studentId", "subjectId") VALUES 
            ('2024-01-01', 2, $1, $2),
            ('2024-01-03', 5, $1, $2),
            ('2024-01-04', 4, $1, $2),
            ('2024-01-05', 2, $1, $2),
            ('2024-01-07', 3, $1, $2);
            `,
			[students[0].id, subjects[0].id],
		);
		await queryRunner.query(
			`
            INSERT INTO grade ("date", "grade", "studentId", "subjectId") VALUES 
            ('2024-01-01', 2, $1, $2),
            ('2024-01-03', 5, $1, $2),
            ('2024-01-04', 4, $1, $2),
            ('2024-01-05', 2, $1, $2),
            ('2024-01-07', 3, $1, $2);
            `,
			[students[0].id, subjects[1].id],
		);

		await queryRunner.query(
			`
            INSERT INTO attendance ("date", "attendance", "studentId", "subjectId") VALUES 
            ('2024-01-01', true, $1, $2),
            ('2024-01-03', true, $1, $2),
            ('2024-01-04', true, $1, $2),
            ('2024-01-05', false, $1, $2),
            ('2024-01-07', true, $1, $2);
            `,
			[students[0].id, subjects[0].id],
		);
		await queryRunner.query(
			`
            INSERT INTO attendance ("date", "attendance", "studentId", "subjectId") VALUES 
            ('2024-01-01', true, $1, $2),
            ('2024-01-03', true, $1, $2),
            ('2024-01-04', true, $1, $2),
            ('2024-01-05', false, $1, $2),
            ('2024-01-07', true, $1, $2);
            `,
			[students[0].id, subjects[1].id],
		);

		await queryRunner.query(
			`
            INSERT INTO "student_subjects_subject" ("studentId", "subjectId") VALUES ($1, $2);
            `,
			[students[0].id, subjects[0].id],
		);
		await queryRunner.query(
			`
            INSERT INTO "student_subjects_subject" ("studentId", "subjectId") VALUES ($1, $2);
            `,
			[students[0].id, subjects[1].id],
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`
            DELETE FROM "grade";
            DELETE FROM "attendance";
            
            DELETE FROM "student_subjects_subject";

            DELETE FROM "student";
            DELETE FROM "subject";
        
        `);
	}
}
