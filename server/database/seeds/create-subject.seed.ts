import { DataSource } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';
import { Subject } from '../entities/subject.entity';

export default class CreateSubject implements Seeder {
	public async run(factory: Factory, dataSource: DataSource) {
		await dataSource
			.createQueryBuilder()
			.insert()
			.into(Subject)
			.values([
				{
					name: 'test',
				},
			])
			.execute();
	}
}
