import { IsString, IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AddMemberDto {
  @IsInt()
  @ApiProperty({ example: 1, description: 'The ID of the ancestor' })
  ancestorId: number;

  @IsString()
  @ApiProperty({ example: 'John Doe', description: 'The name of the new family member' })
  memberName: string;
}
