import {Inject, Injectable} from "@nestjs/common";
import {v4} from "uuid";
import {S3} from "aws-sdk";

import {IS3DeleteDto, IS3GetDto, IS3Options, IS3PutDto, IS3Result} from "./interfaces";
import {ProviderType} from "./s3.constants";

@Injectable()
export class S3Service {
  constructor(
    @Inject(ProviderType.S3)
    private readonly s3: S3,
    @Inject(ProviderType.S3_OPTIONS)
    private readonly options: IS3Options,
  ) {}

  getObject({objectName, bucket}: IS3GetDto): Promise<IS3Result> {
    const params = {
      Bucket: bucket || this.options.bucket,
      Key: objectName,
    };

    return this.s3.getSignedUrlPromise("getObject", params).then((signedUrl: string) => ({
      signedUrl,
    }));
  }

  putObject({contentType, bucket}: IS3PutDto): Promise<IS3Result> {
    const filename = `${v4()}.${contentType.split("/")[1]}`;

    const params = {
      Bucket: bucket || this.options.bucket,
      Key: filename,
      Expires: 60,
      ContentType: contentType,
      ACL: "public-read",
    };

    return this.s3.getSignedUrlPromise("putObject", params).then((signedUrl: string) => ({
      signedUrl,
    }));
  }

  deleteObject({objectName, bucket}: IS3DeleteDto): Promise<any> {
    const params = {
      Bucket: bucket || this.options.bucket,
      Key: objectName,
    };

    return this.s3.deleteObject(params).promise();
  }
}
