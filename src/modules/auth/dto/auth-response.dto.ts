import { ApiProperty } from '@nestjs/swagger';

export class AuthResponseDto {
  @ApiProperty({ example: 'access_token' })
  access_token: string;

  @ApiProperty({
    example: {
      id: 1,
      email: 'user@example.com',
      name: 'Nguyễn Văn A',
    },
  })
  user: {
    id: number;
    email: string;
    name: string;
  };
}
