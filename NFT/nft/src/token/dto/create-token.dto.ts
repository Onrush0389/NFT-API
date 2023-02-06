import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTokenDto {
  tokenId: string;
  @IsString()
  @IsNotEmpty()
  NFTurl: string;
  hash: string;
}
