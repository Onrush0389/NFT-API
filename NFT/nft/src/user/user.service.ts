import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { ethers } from 'ethers';
import { PrismaService } from 'src/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { GetUserDto } from './dto/get-user.dto';

@Injectable()
export class UserService {
  //private users: CreateUserDto[] = [];

  constructor(private readonly prisma: PrismaService) {}

  async insertUser(user: CreateUserDto): Promise<CreateUserDto> {
    //find the user whether it is already exist or not if exsit stop the process

    const findUserurl = await this.getUser(user.NFTurl);

    if (findUserurl) {
      throw new NotFoundException('NFTurl already exists!');
    } else {
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
  }

  async getUser(NFTurl: string): Promise<GetUserDto> {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          NFTurl: NFTurl,
        },
      });
      return user;
    } catch (error) {
      throw new NotFoundException('Could not find user.');
    }
  }
}
