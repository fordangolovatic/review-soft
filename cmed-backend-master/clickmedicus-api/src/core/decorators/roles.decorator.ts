import { SetMetadata } from '@nestjs/common';
import { Role as RoleList } from '@core/enums/roles.enum'

export const ROLES_KEY = 'roles';
export const Roles = (...roles: RoleList[]) => SetMetadata(ROLES_KEY, roles);