import { BaseRepositoryInterface } from '@base/interfaces/base.repository.interface';
import { ActivityProgramEntity } from '@modules/user/user-account/entities/activity-program.entity';
import { ActivityProgramBody } from '@modules/user/user-account/dto/account.activity-program.dto';

export interface ActivityProgramRepositoryInterface
	extends BaseRepositoryInterface<ActivityProgramEntity> {
	createActivityProgram(
		body: ActivityProgramBody,
		userId: number
	): Promise<void>;

	updateActivityProgram(body: ActivityProgramBody): Promise<void>;

	getActivityProgram(userId: number): Promise<ActivityProgramBody>;
}
