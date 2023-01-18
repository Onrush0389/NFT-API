import { Body, Controller, Post } from '@nestjs/common';
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
}
