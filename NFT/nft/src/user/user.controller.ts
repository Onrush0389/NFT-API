import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  usersService: any;
  constructor(private readonly userService: UserService) {}

  @Post()
  async insertUser(@Body() user: CreateUserDto) {
    return this.userService.insertUser(user);
  }

  @Get()
  async getSingleUser(@Query('NFTurl') NFTurl: string) {
    return this.userService.getUser(NFTurl);
  }
}
