import { Injectable, Inject } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class NodemailerService {
	constructor(
		@Inject('MAILER_TRANSPORTER')
		private readonly transporter: nodemailer.Transporter
	) {}

	getTransporter(): nodemailer.Transporter {
		return this.transporter;
	}
}
