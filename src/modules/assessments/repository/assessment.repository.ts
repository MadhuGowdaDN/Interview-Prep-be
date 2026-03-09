import { CreateAssessmentDto } from '@modules/assessments/dto';
import { Assessment } from '@modules/assessments/schemas';
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class AssessmentRepository {

  constructor(
    @InjectModel(Assessment.name)
    private assessmentModel: Model<Assessment>,
  ) { }

  async create(data: CreateAssessmentDto) {
    try {
      const assessment = await this.assessmentModel.create(data);

      return {
        ok: true,
        error: false,
        message: 'Assessment created successfully',
        code: 201,
        data: assessment,
      };

    } catch (error) {

      // Duplicate key error
      if (error.code === 11000) {
        throw new ConflictException({
          ok: false,
          error: true,
          message: 'Assessment already exists',
          code: 409,
        });
      }

      // Validation error from mongoose
      if (error.name === 'ValidationError') {
        throw new BadRequestException({
          ok: false,
          error: true,
          message: error.message,
          code: 400,
        });
      }

      // Unknown errors
      throw new InternalServerErrorException({
        ok: false,
        error: true,
        message: 'Failed to create assessment',
        code: 500,
      });
    }
  }

  findAll() {
    try {
      return this.assessmentModel.find();
    } catch (err) {
      throw new InternalServerErrorException({
        ok: false,
        error: true,
        message: err,
        code: 500,
      });
    }
  }

  findById(id: string) {
    try {
      return this.assessmentModel.findById(id);
    } catch (err) {
      throw new InternalServerErrorException({
        ok: false,
        error: true,
        message: err,
        code: 500,
      });
    }
  }
}