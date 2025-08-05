import { ApiProperty } from '@nestjs/swagger';

export class Tag {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  tag_color: string;

  @ApiProperty()
  tag_content: string;

  @ApiProperty()
  createdAt: Date;
}
