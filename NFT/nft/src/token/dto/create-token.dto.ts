import { IsNotEmpty, IsOptional, IsString, IsUrl } from 'class-validator';
import { GetUserDto } from 'src/user/dto/get-user.dto';

export class CreateTokenDto {
  tokenId: number;
  @IsUrl()
  @IsNotEmpty()
  NFT: string;
  hash: string;
}
