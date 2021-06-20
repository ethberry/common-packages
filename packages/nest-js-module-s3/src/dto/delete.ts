import {ApiProperty} from "@nestjs/swagger";

import {IsString} from "@trejgun/nest-js-validators";

import {IS3DeleteDto} from "../interfaces";

export class S3DeleteDto implements IS3DeleteDto {
  @ApiProperty()
  @IsString({
    required: true,
  })
  public objectName: string;

  @ApiProperty()
  @IsString({
    required: false,
  })
  public bucket: string;
}
