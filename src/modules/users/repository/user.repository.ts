import { ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '@users/schemas';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
  ) { }

  async create(data: any) {
    try {

      // 1️⃣ Check if user already exists
      const existingUser = await this.userModel.findOne({ email: data.email });

      if (existingUser) {
        throw new ConflictException('User already exists with this email');
      }

      // 2️⃣ Hash password
      const hashedPassword = await bcrypt.hash(data.password, 10);

      const payload = {
        ...data,
        password: hashedPassword
      };

      // 3️⃣ Save user
      const user = new this.userModel(payload);
      const result = await user.save();

      return result;

    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async findAll() {
    return this.userModel.find();
  }

  async findById(id: string) {
    return this.userModel.findById(id);
  }

  async findByEmail(email: string) {
    return this.userModel.findOne({ email }).select('+password');
  }

  async update(id: string, data: any) {
    return this.userModel.findByIdAndUpdate(id, data, { new: true });
  }

  async delete(id: string) {
    return this.userModel.findByIdAndDelete(id);
  }

  async updateRefreshToken(userId: string, refreshToken: string) {

    const hashed = await bcrypt.hash(refreshToken, 10);

    return this.userModel.findByIdAndUpdate(
      userId,
      { refreshToken: hashed },
      { new: true }
    );
  }
  async removeRefreshToken(userId: string) {
    return this.userModel.findByIdAndUpdate(
      userId,
      { refreshToken: null },
      { new: true },
    );
  }
}
