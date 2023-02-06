import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { TokenService } from './token.service';

@Controller('token')
export class TokenController {
  tokensService: any;
  constructor(private readonly tokenService: TokenService) {}

  @Post()
  async createToken(@Body('NFTurl') NFTurl: string, @Body('hash') hash: string) {
    const token = await this.tokenService.createTokenId(NFTurl,hash);
    return token;
  }

  @Get()
  async getToken() {
    return 'Hello World';
  }
}
