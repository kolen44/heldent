import { DataSource } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';
import { Student } from '../entities/student.entity';

export default class CreateStudent implements Seeder {
	public async run(factory: Factory, dataSource: DataSource) {
		await dataSource
			.createQueryBuilder()
			.insert()
			.into(Student)
			.values([
				{
					email: 'test@email.com',
					password: 'asdsadsad',
				},
			])
			.execute();
	}
}

// const userRoleID = await dataSource.query(
// 	`SELECT id FROM roles WHERE roles.name = '${Roles.User}'`,
// );

// for (let i = 0; i < 30; i++) {
// 	const name = faker.person.firstName();
// 	await factory(UserEntity)().create({
// 		name,
// 		email: faker.internet.email({ firstName: name }),
// 		password: await bcrypt.hash('123456789', 10),
// 		roleId: userRoleID[0].id,
// 	});
// }
