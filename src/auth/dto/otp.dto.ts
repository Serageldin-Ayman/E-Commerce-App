import { IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class otpCodeDto {
  @ApiProperty({ type: Number, example: 123456, required: true })
  @IsNotEmpty()
  @IsNumber()
  otpCode: number;
}
