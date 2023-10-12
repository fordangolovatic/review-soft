import { ActivityProgramEntity } from '@modules/user/user-account/entities/activity-program.entity';
import { ActivityProgramRepositoryInterface } from '@modules/user/user-account/interfaces/activity-program.repository.interface';
import { BaseAbstractRepository } from '@base/repositories/base.repository';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { UserAccountEntity } from '@modules/user/user-account/entities/user-account.entity';
import { ActivityProgramBody } from '../dto/account.activity-program.dto';

@Injectable()
export class ActivityProgramRepository
	extends BaseAbstractRepository<ActivityProgramEntity>
	implements ActivityProgramRepositoryInterface
{
	constructor(
		@InjectRepository(ActivityProgramEntity)
		private readonly activityProgramEntityRepository: Repository<ActivityProgramEntity>,
		@InjectRepository(UserAccountEntity)
		private readonly userAccountEntityRepository: Repository<UserAccountEntity>,
		@InjectDataSource() private readonly connection: DataSource
	) {
		super(activityProgramEntityRepository);
	}

	async createActivityProgram(
		body: ActivityProgramBody,
		userId: number
	): Promise<void> {
		const account = await this.userAccountEntityRepository.findOne({
			where: { userId: userId }
		});

		for (
			let program = 0;
			program < body.activityProgram.length;
			program++
		) {
			const { date, price, slots } = body.activityProgram[program];

			const activityProgram = this.activityProgramEntityRepository.create(
				{
					account,
					date,
					price,
					slots
				}
			);

			// eslint-disable-next-line no-await-in-loop
			await this.activityProgramEntityRepository.save(activityProgram);
		}
	}

	async updateActivityProgram(body: ActivityProgramBody): Promise<void> {
		for (
			let program = 0;
			program < body.activityProgram.length;
			program++
		) {
			const activityProgram =
				// eslint-disable-next-line no-await-in-loop
				await this.activityProgramEntityRepository.findOne({
					where: {
						id: body.activityProgram[program].id
					}
				});

			Object.assign(activityProgram, body.activityProgram[program]);

			if (body.activityProgram[program].slots.length === 0) {
				// eslint-disable-next-line no-await-in-loop
				await this.activityProgramEntityRepository.delete({
					id: body.activityProgram[program].id
				});
			} else {
				// eslint-disable-next-line no-await-in-loop
				await this.activityProgramEntityRepository.update(
					{
						id: body.activityProgram[program].id
					},
					activityProgram
				);
			}
		}
	}

	async getActivityProgram(id: number) {
		const activityProgram = await this.activityProgramEntityRepository.find(
			{
				where: { account: { userId: id } },
				relations: { consultations: true }
			}
		);

		return { activityProgram };
	}
}
