import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddUsers1712402545655 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		const subjects = await queryRunner.query(`
            INSERT INTO subject (name) VALUES 
            ('math'), 
            ('history'),
            ('geography'),
            ('physics'),
            ('chemistry');
        `);

		const users = await queryRunner.query(`
            INSERT INTO user (email, password) VALUES ('john@example.com', 'password');
        `);

		await queryRunner.query(
			`
            INSERT INTO grade (date, grade, userId, subjectId) VALUES (2024-01-01, 2, $1, $2);
            INSERT INTO grade (date, grade, userId, subjectId) VALUES (2024-01-03, 5, $1, $2);
            INSERT INTO grade (date, grade, userId, subjectId) VALUES (2024-01-04, 4, $1, $2);
            INSERT INTO grade (date, grade, userId, subjectId) VALUES (2024-01-05, 2, $1, $2);
            INSERT INTO grade (date, grade, userId, subjectId) VALUES (2024-01-07, 3, $1, $2);
            `,
			[users[0].id, subjects[0].id],
		);

		await queryRunner.query(
			`
            INSERT INTO attendance (date, attendance, userId, subjectId) VALUES (2024-01-01, true, $1, $2);
            INSERT INTO attendance (date, attendance, userId, subjectId) VALUES (2024-01-03, true, $1, $2);
            INSERT INTO attendance (date, attendance, userId, subjectId) VALUES (2024-01-04, true, $1, $2);
            INSERT INTO attendance (date, attendance, userId, subjectId) VALUES (2024-01-05, false, $1, $2);
            INSERT INTO attendance (date, attendance, userId, subjectId) VALUES (2024-01-07, true, $1, $2);
            `,
			[users[0].id, subjects[0].id],
		);

		await queryRunner.query(
			`
            INSERT INTO user_subjects_subject (userId, subjectId) VALUES (2024-01-01, true, $1, $2);
            `,
			[users[0].id, subjects[0].id],
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`
            DELETE FROM user;
            DELETE FROM subject;
            DELETE FROM grade;
            DELETE FROM attendance;
            DELETE FROM user_subjects_subject;
        `);
	}
}
