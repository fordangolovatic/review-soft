/**
 * An DTO class for user profile list.
 */
export class UserProfileDto {
	/**
	 * PK of the table.
	 */
	userId: number;

	/**
	 * First name of the account.
	 */
	firstName: string;

	/**
	 * First name of the account.
	 */
	lastName: string;

	/**
	 * Account type id.
	 */
	// accountTypeId: number;

    /**
	 * Name of account type like doctor, resident, patient, etc.
	 */
	accountTypeName: string;

	/**
	 * Gender. M = Male, F = Female, O = Other
	 */
	gender: string;

	/**
	 * Address of the account.
	 */
	address: string;

	/**
	 * Country id.
	 */
	countryId: number;

    /**
	 * Name of the country.
	 */
	countryName: string;

	/**
	 * State id.
	 */
	stateId: number;

    /**
	 * Name of the state.
	 */
	stateName: string;

	/**
	 * City id.
	 */
	cityId: number;

    /**
	 * Name of the city.
	 */
	cityName: string;

	/**
	 * Postal code.
	 */
	postalCode: string;

	/**
	 * Email address.
	 */
	email: string;

	/**
	 * This will be used only for assistant doctor. It will be doctor's id who have added the assistant doctor.
	 */
	parentAccountId: number;

	/**
	 * Is the user is translator or not?
	 */
	isTranslator: boolean;

	/**
	 * The identity of the doctor is verified / not by the portal.
	 */
	isVerified: boolean;

	/**
	 * Date of birth to calculate the age.
	 */
	dateOfBirth: string;

	/**
	 * Whether the doctor has accepted the terms and conditions of the portal.
	 */
	termsAndConditionAccepted: boolean;

	/**
	 * Profile image path.
	 */
	profileImage: string;

	activityProgram: [];
}
