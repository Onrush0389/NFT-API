import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { ethers } from 'ethers';
import { PrismaService } from 'src/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { GetUserDto } from './dto/get-user.dto';

@Injectable()
export class UserService {
  getSingleUser() { //create a random wallet
    throw new Error('Method not implemented.');
  }
  private users: CreateUserDto[] = [];

  constructor(private readonly prisma: PrismaService) {}

  async insertUser(user: CreateUserDto): Promise<CreateUserDto> {
    //create a random wallet
    const wallet = ethers.Wallet.createRandom();
    user.walletAddress = wallet.address;
    user.privateKey = wallet.privateKey;
    user.balance = 0;

    // console.log("Wallet address", wallet.address);
    // console.log("Wallet private key", wallet.privateKey);
    // console.log("Wallet mnemonic", wallet.mnemonic);

    return this.prisma.user.create({
      data: user,
    });
  }

  async getUser(NFTurl: string): Promise<GetUserDto> {
    return this.prisma.user.findUnique({
      where: {
        NFTurl: NFTurl,
      },
    });
  }
}
