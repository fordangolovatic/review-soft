import { User } from '@core/decorators/user.decorator';
import { SwaggerRouteDecorator } from '@modules/decorators/swagger.config';
import { UserAccountEntity } from '@modules/user/user-account/entities/user-account.entity';
import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { MetadataService } from './metadata.service';
import { MetadataResponseDto } from "@modules/metadata/dto/metadata.response.dto";

@ApiTags('Metadata')
@Controller('metadata')
export class MetadataController {
    constructor(private readonly metadataService: MetadataService) {
    }

    @SwaggerRouteDecorator({
        apiResponseData: {status: 200, type: MetadataResponseDto},
        apiSecurityData: 'accessToken'
    })
    @Get()
    find(@User() user: UserAccountEntity): Promise<MetadataResponseDto> {
        return this.metadataService.findById(user)
    }
}
