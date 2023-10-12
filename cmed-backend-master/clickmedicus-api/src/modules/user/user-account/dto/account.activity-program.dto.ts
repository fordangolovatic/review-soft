import { ApiProperty } from '@nestjs/swagger';
import { ActivityProgramEntity } from '@modules/user/user-account/entities/activity-program.entity';

export type ActivityProgramBody = {
	activityProgram: ActivityProgramEntity[];
};

export class ActivityProgramItem {
	date: string;
	price: number;
	slots: string[];
}

export class GetActivityProgramResponse {
	@ApiProperty({
		required: true,
		example: [
			{
				date: '2023-04-10',
				price: 50.0,
				slots: ['Slot 1', 'Slot 2']
			}
		]
	})
	activityProgram: ActivityProgramItem[];
}
