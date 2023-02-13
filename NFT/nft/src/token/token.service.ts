import { Injectable, NotFoundException } from '@nestjs/common';
import { ethers } from 'ethers';
import { PrismaService } from 'src/prisma.service';
import { GetUserDto } from 'src/user/dto/get-user.dto';
import { CreateTokenDto } from './dto/create-token.dto';
import * as abi from './MyNFT.json';
import { UserService } from '../user/user.service';
import { GetTokenDto } from './dto/get-token.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class TokenService {
  private tokens: CreateTokenDto[] = [];
  constructor(
    private readonly prisma: PrismaService,
    private readonly userService: UserService,
  ) {}

  contractAddress = '0xDC7eCe116e7b178f31cC02208A51481a993862Fe';
  url = 'https://rpc.debugchain.net';
  pk = process.env.PK!;

  async getToken(hash: string): Promise<any> {
    try {
      const token = await this.prisma.token.findUnique({
        where: {
          hash: hash,
        },
      });
      return token;
    } catch (error) {
      throw new NotFoundException('Could not find token.');
    }
  }

  async getAllTokens(): Promise<any> {
    const tokensall = await this.prisma.token.findMany();
    return tokensall;
  }

  async createTokenId(newtoken: CreateTokenDto): Promise<GetTokenDto> {
    //judge if the NFT is already in the database
    const tokenpush = await this.getToken(newtoken.hash);
    if (tokenpush) {
      throw new NotFoundException('This NFT already exists.');
    } else {
      const provider = new ethers.providers.JsonRpcProvider(this.url);
      const wallet = new ethers.Wallet(this.pk, provider);
      const contract = new ethers.Contract(
        this.contractAddress,
        abi.abi,
        wallet,
      );

      const owner = await this.userService.getUser(newtoken.NFT);
      const address = owner.walletAddress;

      const tx = await contract.awardToken(address, newtoken.NFT);
      const receipt = await tx.wait();

      // const tokenew = {
      //   tokenId: parseInt(receipt.events[0].args[2]),
      //   NFT: newtoken.NFT,
      //   hash: newtoken.hash,
      // };
      const tokenId = parseInt(receipt.events[0].args[2]);
      console.log('tokenId', tokenId);

      return this.prisma.token.create({
        data: {
          ...newtoken,
          tokenId: tokenId,
        },
      });
    }
  }
}
