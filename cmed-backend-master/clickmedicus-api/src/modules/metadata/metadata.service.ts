import { UserAccountEntity } from '@modules/user/user-account/entities/user-account.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MetadataResponseDto } from '@modules/metadata/dto/metadata.response.dto';

@Injectable()
export class MetadataService {
	constructor(
		@InjectRepository(UserAccountEntity)
		private userAccountRepository: Repository<UserAccountEntity>
	) {}

	async findById(user: UserAccountEntity): Promise<MetadataResponseDto> {
		const account = await this.userAccountRepository.findOne({
			where: { userId: user.userId, accountType: user.accountType }
		});
		if (account) {
			return {
				accountType: account.accountType,
				profileImage: account.profileImage,
				userId: user.userId,
				firstName: account.firstName,
				lastName: account.lastName
			};
		}
	}
}
