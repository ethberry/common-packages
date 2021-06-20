import {Inject, Injectable, Logger, LoggerService} from "@nestjs/common";
import {Email} from "node-mailjet";

import {ProviderType} from "./mailjet.constants";
import {IMailjetOptions, IMailjetSendDto} from "./interfaces";

@Injectable()
export class MailjetService {
  constructor(
    @Inject(Logger)
    private readonly loggerService: LoggerService,
    @Inject(ProviderType.MAILJET)
    private readonly mailjet: Email.Client,
    @Inject(ProviderType.MAILJET_OPTIONS)
    private readonly options: IMailjetOptions,
  ) {}

  public sendEmail(mail: IMailjetSendDto): Promise<{status: boolean}> {
    return this.mailjet
      .post("send", {version: "v3.1"})
      .request({
        Messages: [
          {
            From: {
              Email: this.options.from,
              Name: this.options.name,
            },
            To: mail.to.map(to => ({
              Email: to,
            })),
            Subject: mail.subject,
            HTMLPart: mail.html,
          },
        ],
      })
      .then(() => {
        return {status: true};
      })
      .catch(e => {
        this.loggerService.error(e.message, e.stack, MailjetService.name);
        return {status: false};
      });
  }

  public addToContactList(
    listId: number,
    data: {email: string; name: string},
    props: Record<string, any>,
  ): Promise<Email.Response> {
    return this.mailjet
      .post("contactslist", {version: "v3"})
      .id(listId)
      .action("managecontact")
      .request({
        Name: data.name,
        Properties: props,
        Action: "addnoforce",
        Email: data.email,
      })
      .then((result: Email.Response) => {
        // @ts-ignore
        if (result.body.Total) {
          this.loggerService.log(`Successfully added ${data.email} to contact list`, MailjetService.name);
        }
        return result;
      });
  }

  public async deleteFromContactList(listID: number, data: {email: string}): Promise<void> {
    await this.mailjet
      .post("contactslist", {version: "v3"})
      .id(listID)
      .action("managecontact")
      .request({
        Action: "remove",
        Email: data.email,
      })
      .then((result: any) => {
        if (result.body.Total) {
          this.loggerService.log(`Successfully deleted ${data.email} from contact list list`, MailjetService.name);
        }
      });
  }
}
