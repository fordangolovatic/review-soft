import { DIToken } from '@core/constants/enums/ditoken.enum';
import { UserAccountRepositoryInterface } from '@modules/user/user-account/interfaces/user-account.repository.interface';
import { Inject, Injectable } from '@nestjs/common';
import { QueryResidentsDto } from './dto/residents.query.dto';
import { ResidentServiceInterface } from './interfaces/resident.service.interface';

/**
 * A service / provider for account table.
 */
@Injectable()
export class ResidentService implements ResidentServiceInterface {
	constructor(
		@Inject(DIToken.USER_ACCOUNT_REPOSITORY_INTERFACE)
		private readonly userAccountRepository: UserAccountRepositoryInterface
	) {}

	/**
	 * Returns a list of all the records of account.
	 */
	findAll(query: QueryResidentsDto) {
		return this.userAccountRepository.getResidentsInformation(query);
	}

	/**
	 * Returns profile details from a specific resident id.
	 */
	findProfileById(residentId: number) {
		return this.userAccountRepository.getProfile(residentId);
	}
}
