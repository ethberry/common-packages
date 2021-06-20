export interface IMailjetSendDto {
  to: Array<string>;
  html: string;
  subject: string;
}
