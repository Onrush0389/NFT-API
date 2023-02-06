import { Injectable, NotFoundException } from '@nestjs/common';
import { ethers } from 'ethers';
import { PrismaService } from 'src/prisma.service';
import { GetUserDto } from 'src/user/dto/get-user.dto';
import { CreateTokenDto } from './dto/create-token.dto';
import * as abi from './MyNFT.json';
import { UserService } from '../user/user.service';
import { GetTokenDto } from './dto/get-token.dto';
import { Prisma } from '@prisma/client';
import console from 'console';

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

  async createTokenId(NFTurl: string, hash: string): Promise<CreateTokenDto> {
    //judge if the NFTurl is already in the database

    const provider = new ethers.providers.JsonRpcProvider(this.url);
    const wallet = new ethers.Wallet(this.pk, provider);
    const contract = new ethers.Contract(this.contractAddress, abi.abi, wallet);

    const owner = await this.userService.getUser(NFTurl);
    const address = owner.walletAddress;

    const tx = await contract.awardToken(address, NFTurl);
    const receipt = await tx.wait();

    const token = {
      tokenId: receipt.events[0].args[2].toNumber(),
      NFTurl: NFTurl,
      hash: hash,
    };

    this.tokens.push(token);
    return token;
  }
}
