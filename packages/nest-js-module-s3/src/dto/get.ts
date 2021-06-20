import {ApiProperty} from "@nestjs/swagger";

import {IsString} from "@trejgun/nest-js-validators";

import {IS3GetDto} from "../interfaces";

export class S3GetDto implements IS3GetDto {
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
