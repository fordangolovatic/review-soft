import { Module } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';

@Module({
	providers: [
		{
			provide: 'MAILER_TRANSPORTER',
			useFactory: () => {
				return nodemailer.createTransport({
					...((process.env.MAIL_PROVIDER
						? ({
								service: process.env.MAIL_PROVIDER
						  } as SMTPTransport.Options)
						: {
								host: process.env.MAIL_HOST,
								port: process.env.MAIL_PORT
						  }) as SMTPTransport),
					auth: {
						user: process.env.MAIL_FROM,
						pass: process.env.MAIL_PASSWORD
					}
				});
			}
		}
	],
	exports: ['MAILER_TRANSPORTER']
})
export class NodemailerModule {}
