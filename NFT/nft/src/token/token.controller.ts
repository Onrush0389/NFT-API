import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { CreateTokenDto } from './dto/create-token.dto';
import { TokenService } from './token.service';

@Controller('token')
export class TokenController {
  tokensService: any;
  constructor(private readonly tokenService: TokenService) {}

  @Post()
  async createToken(@Body() newtoken: CreateTokenDto) {
    const token = await this.tokenService.createTokenId(newtoken);
    console.log(token.tokenId);
    return token;
  }

  @Get()
  async getallTokens() {
    const tokens = await this.tokenService.getAllTokens();
    return tokens;
  }

  @Get(':hash')
  async getToken(@Query('hash') hash: string) {
    const token = await this.tokenService.getToken(hash);
    return token;
  }
}
