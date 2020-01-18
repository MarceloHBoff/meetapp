import nodemailer from 'nodemailer';

import { resolve } from 'path';
import exphbs from 'express-handlebars';
import nodemailerhbs from 'nodemailer-express-handlebars';

import mailConfig from '../config/mail';

class Mail {
  constructor() {
    const {
      host, port, secure, auth,
    } = mailConfig;
    // Inicializa conexão de emails
    this.transporter = nodemailer.createTransport({
      host,
      port,
      secure,
      auth: auth.user ? auth : null,
    });

    this.configTemplates();
  }

  configTemplates() {
    const viewPath = resolve(__dirname, '..', 'app', 'views', 'email');

    this.transporter.use(
      'compile',
      nodemailerhbs({
        viewEngine: exphbs.create({
          layoutsDir: resolve(viewPath, 'layouts'),
          partialsDir: resolve(viewPath, 'partials'),
          defaultLayout: 'default',
          extname: '.hbs',
        }),
        viewPath,
        extName: '.hbs',
      }),
    );
  }

  sendMail(message) {
    // Envia o email com as informações padrão e também as personalizadas
    return this.transporter.sendMail({
      ...mailConfig.default,
      ...message,
    });
  }
}

export default new Mail();
