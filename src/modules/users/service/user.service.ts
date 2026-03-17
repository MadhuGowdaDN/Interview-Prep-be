import { RegisterDto } from '@modules/auth';
import { Injectable } from '@nestjs/common';
import { UsersRepository } from '@users/repository';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) { }

  createUser(dto: RegisterDto) {
    return this.usersRepository.create(dto);
  }

  // getUsers() {
  //   return this.usersRepository.findAll();
  // }

  // getUser(id: string) {
  //   return this.usersRepository.findById(id);
  // }

  // updateUser(id: string, dto: any) {
  //   return this.usersRepository.update(id, dto);
  // }

  // deleteUser(id: string) {
  //   return this.usersRepository.delete(id);
  // }
}
