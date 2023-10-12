import { Module } from '@nestjs/common';
import { EmailService } from './mail.service'
import { NodemailerService } from '../nodemailer/nodemailer.service';
import { NodemailerModule } from '../nodemailer/nodemailer.module';

@Module({
	imports: [NodemailerModule],
	providers: [EmailService, NodemailerService],
	exports: [EmailService]
})
export class EmailModule {}
