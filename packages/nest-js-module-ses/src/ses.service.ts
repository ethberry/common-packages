import {Inject, Injectable, Logger, LoggerService} from "@nestjs/common";
import {SES} from "aws-sdk";

import {ISesOptions, ISesSendDto} from "./interfaces";
import {ProviderType} from "./ses.constants";

@Injectable()
export class SesService {
  constructor(
    @Inject(Logger)
    private readonly loggerService: LoggerService,
    @Inject(ProviderType.SES)
    private readonly ses: SES,
    @Inject(ProviderType.SES_OPTIONS)
    private readonly options: ISesOptions,
  ) {}

  async sendEmail(mail: ISesSendDto): Promise<{status: boolean}> {
    return this.ses
      .sendEmail({
        Source: this.options.from,
        Destination: {
          ToAddresses: mail.to,
        },
        Message: {
          Body: {
            Html: {
              Data: mail.html,
            },
          },
          Subject: {
            Data: mail.subject,
          },
        },
      })
      .promise()
      .then(() => {
        return {status: true};
      })
      .catch(e => {
        this.loggerService.error(e.message, e.stack, SesService.name);
        return {status: false};
      });
  }
}
