import { RenderTemplateOptions } from './interfaces/mail.service.interface';
import { ErrorCode } from '@core/constants/enums/errorCodes.enum';
import { SuccessCode } from '@core/constants/enums/successCodes.enum';
import * as path from 'path';
import * as fs from 'fs';
import * as handlebars from 'handlebars';
import { Injectable } from '@nestjs/common';
import { NodemailerService } from '../nodemailer/nodemailer.service';

@Injectable()
export class EmailService {
	constructor(private readonly nodemailerService: NodemailerService) {}

	async sendTemplatedEmail(
		options: RenderTemplateOptions
	): Promise<{ success: string }> {
		const { templatePath, to, subject, context } = options;
		const template = fs.readFileSync(
			path.join(__dirname, templatePath),
			'utf8'
		);

		const compiledTemplate = handlebars.compile(template);

		const html = compiledTemplate(context);
		const mailOptions = {
			from: process.env.MAIL_FROM,
			to,
			subject,
			html
		};

		const transporter = this.nodemailerService.getTransporter();
		const info = await transporter.sendMail(mailOptions);

		if (!info) {
			throw new Error(ErrorCode.EMAIL_NOT_SENT);
		}
		return {
			success: SuccessCode.CHECK_RESET_EMAIL
		};
	}
}
