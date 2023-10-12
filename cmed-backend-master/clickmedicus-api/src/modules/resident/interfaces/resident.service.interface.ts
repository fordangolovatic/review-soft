import { QueryResidentsDto } from '../dto/residents.query.dto';

/**
 * A service contract which must be implemented by [DoctorService]{@link ResidentService}.
 */
export interface ResidentServiceInterface {
	findAll(query: QueryResidentsDto);
}
