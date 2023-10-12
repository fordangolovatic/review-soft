import { LoginDto } from '../dto/login.dto';
import { PermissionDto } from '../dto/permissions.dto';

/**
 * A service contract which must be implemented by [AuthService]{@link AuthService}.
 */
export interface AuthServiceInterface {
	/**
	 * Validates the user for given username and password.
	 * @param {string} username - User name.
	 * @param {string} password - Password.
	 */
	authenticate(
		username: string,
		password: string,
		isAdmin: boolean
	): Promise<any>;

	/**
	 * Generate JWT access token and refresh token and create new user session.
	 * @param user A simple object with userName and userId properties.
	 * @returns A JWT access token and refresh token.
	 */
	createUserSession(
		user: {
			username: string;
			userId: number;

		},
		login: LoginDto
	): Promise<{
		accessToken: string;
		refreshToken: string;
		isAdmin: boolean;
	}>;

	/**
	 * Generate Refresh token.
	 * @param user A simple object with userName and userId properties.
	 * @returns A JWT refresh token.
	 */
	generateRefreshToken(user: {
		username: string;
		userId: number;
		sessionId: string;
		permissions: PermissionDto[];
	}): Promise<{ refreshToken: string }>;

	/**
	 * Generate access token.
	 * @param user A simple object with userName, userId and session id properties.
	 * @returns A JWT access token.
	 */
	generateAccessToken(user: {
		username: string;
		userId: number;
		sessionId: string;
		permissions: PermissionDto[];
	}): Promise<{ accessToken: string }>;

	/**
	 * Get user permissions.
	 * @param {number} userId - User id.
	 */
	getUserPermissions(userId: number): Promise<PermissionDto[]>;
}
