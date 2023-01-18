import { IsNotEmpty, IsString, IsUrl } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;
  walletAddress: string;
  privateKey: string;

  @IsUrl()
  @IsNotEmpty()
  NFTurl: string;
  balance: number;
  tokenId: string;
}
