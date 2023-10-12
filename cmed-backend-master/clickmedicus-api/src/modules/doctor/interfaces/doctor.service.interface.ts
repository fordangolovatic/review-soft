import { QueryDoctorsDto } from '../dto/doctors.query.dto';

/**
 * A service contract which must be implemented by [DoctorService]{@link DoctorService}.
 */
export interface DoctorServiceInterface {
	findAll(query: QueryDoctorsDto);
}
