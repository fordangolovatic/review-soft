import { Permissions } from '@core/decorators/permission.decorator';
import { User } from '@core/decorators/user.decorator';
import { PermissionEnum } from '@core/enums/permission.enum';
import {
	Body,
	ClassSerializerInterceptor,
	Controller,
	Delete,
	Get,
	Inject,
	Param,
	ParseIntPipe,
	Patch,
	Post,
	Put,
	UseInterceptors
} from '@nestjs/common';

import { NoAuthRoute } from '@core/decorators/noauth.decorator';
import { DIToken } from '@core/enums/ditoken.enum';
import { SwaggerRouteDecorator } from '@modules/decorators/swagger.config';
import { UserProfileDto } from '@modules/user-profile/dto/user-profile.dto';
import {
	ActivityProgramBody,
	GetActivityProgramResponse
} from '@modules/user/user-account/dto/account.activity-program.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateMedicalRecordDto } from './dto/create-medical-record.dto';
import { CreateProfessionalExperienceDto } from './dto/create-professional-experience.dto';
import { CreateProfessionalInfoDto } from './dto/create-professional-info.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { MedicalRecordResponseDto } from './dto/medical-record.response.dto';
import { ProfessionalInfoResponseDto } from './dto/professional-info.response.dto';
import { UpdateMedicalRecordDto } from './dto/update-medical-record.dto';
import { UpdateProfessionalInfoDto } from './dto/update-professional-info.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { UserAccountResponse } from './dto/user-account.response.dto';
import { UserAccountEntity } from './entities/user-account.entity';
import { UserAccountServiceInterface } from './interfaces/user-account.service.interface';
import { EmailService } from '../../mail/mail.service';
import { ErrorCode } from '@core/constants/enums/errorCodes.enum';
import { SuccessCode } from '@core/constants/enums/successCodes.enum';

/**
 * An API for user master.
 */
@ApiTags('Users')
@Controller('users')
export class UserAccountController {
	constructor(
		@Inject(DIToken.USER_ACCOUNT_SERVICE_INTERFACE)
		private userAccountService: UserAccountServiceInterface,
		private mailService: EmailService
	) {}

	/**
	 * Returns a informations about current logged-in user
	 */
	@SwaggerRouteDecorator({
		apiOperationData: {
			summary:
				'Returns a single record of account based on the current user session.'
		},
		apiResponseData: { status: 200, type: UserAccountResponse },
		apiSecurityData: 'accessToken'
	})
	@Get('me')
	public async getCurrentUserProfile(
		@User() user: UserAccountEntity
	): Promise<any> {
		return await this.userAccountService.getOneById(user.userId ?? 0);
	}

	/**
	 * Updates the logged in user data
	 */
	@SwaggerRouteDecorator({
		apiOperationData: {
			summary: 'Updated the logged-in user data'
		},
		apiResponseData: { status: 200, type: UserAccountResponse },
		apiSecurityData: 'accessToken'
	})
	@Patch('me')
	public async updateCurrentUserProfile(
		@Body() data: UpdateUserDto,
		@User() user: UserAccountEntity
	): Promise<any> {
		return await this.userAccountService.update(user.userId, data);
	}

	/**
	 * Returns a list of account based on account type.
	 */
	@SwaggerRouteDecorator({
		apiOperationData: {
			summary:
				'Returns a single record of account based on the given account_id.'
		},
		apiResponseData: { status: 200, type: UserAccountResponse },
		apiSecurityData: 'accessToken'
	})
	@Get('userId')
	// @Permissions(`ACUNT:${PermissionEnum.VIEW}`)
	public async getUserProfilesByAccountType(
		@Param('userId', ParseIntPipe) userId: number
	): Promise<UserProfileDto[]> {
		return await this.userAccountService.getAllUserProfiles(userId);
	}

	/**
	 * Returns a list of all the records of user.
	 */
	@UseInterceptors(ClassSerializerInterceptor)
	@SwaggerRouteDecorator({
		apiOperationData: {
			summary: 'Returns a list of all the records of user table.'
		},

		apiResponseData: {
			status: 200,
			type: UserAccountResponse,
			isArray: true
		},
		apiSecurityData: 'accessToken'
	})
	@NoAuthRoute()
	@Get()
	@ApiBearerAuth('access-token')
	public async get(): Promise<UserAccountEntity[]> {
		return await this.userAccountService.getAll();
	}

	@Get('professional-experience')
	public async getProfessionaExperience(
		@Body() data: CreateProfessionalExperienceDto
	) {
		await this.userAccountService.getProfessionalExperience;
	}

	@SwaggerRouteDecorator({
		apiBodyData: { type: CreateProfessionalExperienceDto },
		apiOperationData: {
			summary: 'create professional-experience'
		},
		apiSecurityData: 'accessToken'
	})
	@Post('professional-experience')
	public async createProfessionaExperience(
		@Body() data: CreateProfessionalExperienceDto
	) {
		await this.userAccountService.createProfessionalExperience(data);
	}

	@SwaggerRouteDecorator({
		apiOperationData: {
			summary: 'delete professional-experience'
		},
		apiSecurityData: 'accessToken'
	})
	@Delete('professional-experience/:id')
	public async deleteProfessionaExperience(@Param('id') id: number) {
		await this.userAccountService.deleteProfessionalExperience(id);
	}

	@SwaggerRouteDecorator({
		apiResponseData: {
			type: ProfessionalInfoResponseDto,
			status: 200
		},
		apiOperationData: {
			summary:
				'EP to get professional info for the current logged-in user.'
		},
		apiSecurityData: 'accessToken'
	})
	@Get('professional-info')
	public async getProfessionaInfo(@User() user: UserAccountEntity) {
		return this.userAccountService.getProfessionalInfo(user);
	}

	@SwaggerRouteDecorator({
		apiBodyData: {
			type: CreateProfessionalInfoDto
		},
		apiResponseData: { status: 200 },
		apiSecurityData: 'accessToken'
	})
	@Post('professional-info')
	public async createProfessionaInfo(
		@Body() data: CreateProfessionalInfoDto,
		@User() user: UserAccountEntity
	) {
		await this.userAccountService.createProfessionalInfo(data, user);
	}

	@SwaggerRouteDecorator({
		apiBodyData: { type: UpdateProfessionalInfoDto },
		apiOperationData: {
			summary: 'EP to update the same values.'
		},
		apiSecurityData: 'accessToken'
	})
	@Patch('professional-info')
	public async updateProfessionalInfo(
		@User() user: UserAccountEntity,
		@Body() data: UpdateProfessionalInfoDto
	) {
		return this.userAccountService.updateProfessionalInfo(data, user);
	}

	@SwaggerRouteDecorator({
		apiBodyData: { type: UpdateProfessionalInfoDto },
		apiOperationData: {
			summary: 'EP to update the same values.'
		},
		apiSecurityData: 'accessToken'
	})
	@Delete('professional-info/:id')
	public async deleteProfessionalInfo(@Param('id') id: number) {
		return this.userAccountService.deleteProfessionalInfo(id);
	}

	/**
	 * Create medical record
	 */
	@SwaggerRouteDecorator({
		apiSecurityData: 'accessToken'
	})
	@Post('medical-record')
	@Permissions(`ACUNT:${PermissionEnum.VIEW}`)
	public async createMedicalRecord(
		@User() user: UserAccountEntity,
		@Body() data: CreateMedicalRecordDto
	) {
		await this.userAccountService.createMedicalRecord(data, user);
	}

	/**
	 * Update medical record
	 */
	@SwaggerRouteDecorator({
		apiSecurityData: 'accessToken'
	})
	@Patch('medical-record')
	@Permissions(`ACUNT:${PermissionEnum.VIEW}`)
	public async updateMedicalRecord(
		@User() user: UserAccountEntity,
		@Body() data: UpdateMedicalRecordDto
	) {
		return this.userAccountService.updateMedicalRecord(user, data);
	}

	/**
	 * Return medical record
	 */
	@SwaggerRouteDecorator({
		apiResponseData: { type: MedicalRecordResponseDto, status: 200 },
		apiSecurityData: 'accessToken'
	})

	/**
	 * Return medical record
	 */
	@SwaggerRouteDecorator({
		apiResponseData: { type: MedicalRecordResponseDto, status: 200 },
		apiSecurityData: 'accessToken'
	})
	@Get('medical-record')
	@Permissions(`ACUNT:${PermissionEnum.VIEW}`)
	public async getMedicalRecord(@User() user: UserAccountEntity) {
		return this.userAccountService.getMedicalRecord(user);
	}

	@SwaggerRouteDecorator({
		apiResponseData: { type: MedicalRecordResponseDto, status: 200 },
		apiSecurityData: 'accessToken'
	})
	@Get('medical-record/:id')
	@Permissions(`ACUNT:${PermissionEnum.VIEW}`)
	public async getMedicalRecordByUserId(
		@Param('id', ParseIntPipe) id: number
	) {
		return this.userAccountService.getMedicalRecordByUserId(id);
	}

	/**
	 * Return  activity program
	 */
	@SwaggerRouteDecorator({
		apiResponseData: { type: MedicalRecordResponseDto, status: 200 },
		apiSecurityData: 'accessToken'
	})
	@Get('activity-program')
	@Permissions(`ACUNT:${PermissionEnum.VIEW}`)
	public async getActivityProgram(@User() user: UserAccountEntity) {
		return this.userAccountService.getActivityProgram(user.userId);
	}

	/**
	 * Returns a single record of user based on the given user id.
	 * @param {number} id - a unique id / primary key.
	 */
	@UseInterceptors(ClassSerializerInterceptor)
	@SwaggerRouteDecorator({
		apiOperationData: {
			summary:
				'Returns a single record of user table based on the given user_id.'
		},
		apiResponseData: { status: 200, type: UserAccountResponse },
		apiSecurityData: 'accessToken'
	})
	@Get(':id')
	@ApiBearerAuth('access-token')
	public async getOneById(
		@Param('id', ParseIntPipe) id: number
	): Promise<UserAccountEntity> {
		return await this.userAccountService.getOneById(id);
	}

	/**
	 * Create new user.
	 * @param {CreateUserDto} data - Data which need to be stored in database table.
	 */
	@SwaggerRouteDecorator({
		apiOperationData: { summary: 'Create new user.' },
		apiResponseData: {
			status: 201,
			type: Number
		},
		apiBodyData: { type: CreateUserDto }
	})
	@NoAuthRoute()
	@Post()
	public async create(@Body() data: CreateUserDto): Promise<CreateUserDto> {
		return await this.userAccountService.create(data);
	}

	/**
	 * Update an existing user.
	 * @param {UpdateUserDto} data - Data which need to be stored in database table.
	 */
	@SwaggerRouteDecorator({
		apiOperationData: { summary: 'Update an existing user.' },
		apiSecurityData: 'accessToken'
	})
	@Put()
	@ApiBearerAuth('access-token')
	public async update(@Body() data: UpdateUserDto): Promise<boolean> {
		return (
			(await this.userAccountService.update(data.userId, data)).userId > 0
		);
	}

	/**
	 * Delete user based on the given user id.
	 * @param {number} id - a unique id / primary key.
	 */
	@SwaggerRouteDecorator({
		apiOperationData: {
			summary: 'Delete user based on the given user_id.'
		},
		apiSecurityData: 'accessToken'
	})
	@Delete(':id')
	@ApiBearerAuth('access-token')
	public async delete(
		@Param('id', ParseIntPipe) id: number
	): Promise<boolean> {
		return (await this.userAccountService.delete(id)).affected > 0;
	}

	/**
	 * Creates a new activity program entry for logged-in user's account.
	 * @param body
	 * @param user The user object extracted from JWT.
	 */
	@Post('activity-program')
	@Permissions(`ACUNT:${PermissionEnum.CREATE}`)
	@SwaggerRouteDecorator({
		apiBodyData: { type: GetActivityProgramResponse },
		apiResponseData: { type: GetActivityProgramResponse, status: 200 },
		apiOperationData: {
			summary: 'Creates a new activity program entry for logged-in user.'
		},
		apiSecurityData: 'accessToken'
	})
	async createActivity(
		@Body() body: ActivityProgramBody,
		@User() user: UserAccountEntity
	): Promise<void> {
		await this.userAccountService.createActivity(user.userId, body);
	}

	/**
	 * Updates the activity program entries for logged-in user's account.
	 * @param body
	 */

	@SwaggerRouteDecorator({
		apiBodyData: { type: GetActivityProgramResponse },
		apiResponseData: { type: GetActivityProgramResponse, status: 200 },
		apiOperationData: {
			summary: 'Updates the activity program entries for logged-in user.'
		},
		apiSecurityData: 'accessToken'
	})
	@Patch('activity-program')
	@Permissions(`ACUNT:${PermissionEnum.MODIFY}`)
	async updateActivity(@Body() body: ActivityProgramBody): Promise<void> {
		return this.userAccountService.updateActivityProgram(body);
	}

	/**
	 * Change Password.
	 * @Body oldPassword and newPassword .
	 */

	@Patch('change-password')
	async changePassword(
		@User() user: UserAccountEntity,
		@Body() data: UpdatePasswordDto
	): Promise<any> {
		return this.userAccountService.changePassword(data, user);
	}

	@NoAuthRoute()
	@Post('forgot-password')
	async forgotPassword(
		@Body() body: { email: string }
	): Promise<{ success: string }> {
		const user = await this.userAccountService.forgotPassword(body.email);
		const { username, email, passwordResetToken } = user;
		const title = 'Reset your password';
		return await this.mailService.sendTemplatedEmail({
			to: email,
			subject: 'Account Password Reset',
			templatePath: '../../mail/templates/reset-password-template.hbs',
			context: {
				title,
				username,
				url: process.env.FRONTEND_BASE_URL,
				passwordResetToken
			}
		});
	}

	@NoAuthRoute()
	@Post('reset-password/:token')
	async resetPassword(
		@Param('token') token: string,
		@Body() body: { newPassword: string }
	) {
		const result = await this.userAccountService.resetPassword(
			token,
			body.newPassword
		);
		if (!result.success) {
			throw new Error(ErrorCode.PASSWORD_RESET_FAILED);
		}
		return { success: SuccessCode.PASSWORD_UPDATED };
	}
}
