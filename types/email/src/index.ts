export interface ISendEmailDto {
  to: Array<string>;
  html: string;
  subject: string;
}

export interface IEmailResult {
  status: boolean;
}

export interface ISendMailService {
  sendEmail(mail: ISendEmailDto): Promise<IEmailResult>;
}
