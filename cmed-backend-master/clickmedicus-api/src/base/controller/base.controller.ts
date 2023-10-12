import { ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth('access-token')
export class BaseController {}
