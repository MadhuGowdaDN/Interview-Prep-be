import { RegisterDto } from '@modules/auth';
import {
  Body,
  Controller,
  Post
} from '@nestjs/common';
import { UsersService } from '@users/service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post()
  create(@Body() dto: RegisterDto) {
    return this.usersService.createUser(dto);
  }

  // @Get()
  // findAll() {
  //   return this.usersService.getUsers();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.usersService.getUser(id);
  // }

  // @Put(':id')
  // update(@Param('id') id: string, @Body() dto: any) {
  //   return this.usersService.updateUser(id, dto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.usersService.deleteUser(id);
  // }
}
