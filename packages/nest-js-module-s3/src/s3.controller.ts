import {Controller, Get, Query} from "@nestjs/common";

import {S3DeleteDto, S3GetDto, S3PutDto} from "./dto";
import {S3Service} from "./s3.service";
import {IS3Result} from "./interfaces";

@Controller("/s3")
export class S3Controller {
  constructor(private readonly s3Service: S3Service) {}

  @Get("/put")
  public putObject(@Query() data: S3PutDto): Promise<IS3Result> {
    return this.s3Service.putObject(data);
  }

  @Get("/get")
  public getObject(@Query() data: S3GetDto): Promise<IS3Result> {
    return this.s3Service.getObject(data);
  }

  @Get("/delete")
  public deleteObject(@Query() data: S3DeleteDto): Promise<any> {
    return this.s3Service.deleteObject(data);
  }
}
