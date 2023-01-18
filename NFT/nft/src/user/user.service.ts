import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { GetUserDto } from './dto/get-user.dto';
import { ethers, Signer } from 'ethers';

@Injectable()
export class UserService {
  private users: CreateUserDto[] = [];

  constructor(private readonly prisma: PrismaService) {}

  async insertUser(user: CreateUserDto): Promise<CreateUserDto> {
    // create a random wallet
    const wallet = ethers.Wallet.createRandom();
    user.walletAddress = wallet.address;
    user.privateKey = wallet.privateKey;
    user.balance = 0;

    // console.log("Wallet address", wallet.address);
    // console.log("Wallet private key", wallet.privateKey);
    // console.log("Wallet mnemonic", wallet.mnemonic);

    //Download ABI
    const response = await fetch(
      'https://etherdata-blockchain.github.io/msbd5017-docs/docs/05-Chapter5/files/MyNFT.json',
    );
    const jsonData = await response.json();
    const abi = jsonData.abi;

    //Create the contract instance
    const contractAddress = '0x9ab29c1cc907448Bc081668A09Bfd77338B4D037';

    const provider = new ethers.providers.JsonRpcProvider(
      "https://rpc.debugchain.net"
    );
    const signer: Signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, abi, signer);

    // mint a new NFT
    const tx = await contract.awardItem(user.walletAddress, user.NFTurl);
    const token = await tx.wait();

    user.tokenId = token.logs[0].data.toString();

    return this.prisma.user.create({
      data: user,
    });
  }
}
