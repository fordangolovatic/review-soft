import { DIToken } from '@core/constants/enums/ditoken.enum';
import { UserAccountRepositoryInterface } from '@modules/user/user-account/interfaces/user-account.repository.interface';
import { Inject, Injectable } from '@nestjs/common';
import { QueryDoctorsDto } from './dto/doctors.query.dto';
import { DoctorServiceInterface } from './interfaces/doctor.service.interface';

/**
 * A service / provider for account table.
 */
@Injectable()
export class DoctorService implements DoctorServiceInterface {
	constructor(
		@Inject(DIToken.ACCOUNT_REPOSITORY_INTERFACE)
		private readonly userAccountRepository: UserAccountRepositoryInterface
	) {}

	/**
	 * Returns a list of all the records of account.
	 */
	findAll(query: QueryDoctorsDto) {
		return this.userAccountRepository.getDoctorsInformation(query);
	}

	/**
	 * Returns profile details from a specific doctor id.
	 */
	findProfileById(doctorId: number) {
		return this.userAccountRepository.getProfile(doctorId);
	}
}
