import { ContactClientModel } from './contact-client.model';
import { Controller, Get, Post, Body, HttpStatus, Req } from '@nestjs/common';
import { AppService } from './app.service';
import * as nodemailer from 'nodemailer';
import { Request } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('/create')
  async create(@Body() clientModel: ContactClientModel) {
    await this.sendMain(clientModel);
    return HttpStatus.OK;
  }

  private async sendMain({ name, phone, email, message }: ContactClientModel) {
    // create reusable transporter object using the default SMTP transport
    const transporter = nodemailer.createTransport({
      host: 'smtp.yandex.ru',
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: 'justtotrip@yandex.ru', // generated ethereal user
        pass: '889955QCVBa', // generated ethereal password
      },
    });

    // send mail with defined transport object
    await transporter.sendMail({
      from: 'justtotrip@yandex.ru', // sender address
      to: 'justtotrip@yandex.ru', // list of receivers
      subject: 'Test ✔', // Subject line
      text: `
        Имя: ${name}
        Телефон: ${phone}
        Почта: ${email}
        Сообщение: ${message}
      `,
    });
  }
}
