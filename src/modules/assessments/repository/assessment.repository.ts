import { CreateAssessmentDto, UpdateAssessmentDto, UpdateQuestionDto, CreateQuestionDto } from '@modules/assessments/dto';
import { Assessment } from '@modules/assessments/schemas';
import { PrepareAssessment } from '@modules/assessments-prepare/schemas';
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

@Injectable()
export class AssessmentRepository {

  constructor(
    @InjectModel(Assessment.name)
    private assessmentModel: Model<Assessment>,
    @InjectModel(PrepareAssessment.name)
    private prepareAssessmentModel: Model<PrepareAssessment>,
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

  async update(id: string, data: UpdateAssessmentDto) {
    if (data.questions) {
      await this.ensureNotInProgress(id);
    }
    try {
      const assessment = await this.assessmentModel.findByIdAndUpdate(id, data, { new: true });
      if (!assessment) throw new NotFoundException('Assessment not found');
      return { ok: true, data: assessment, message: "Assessment updated successfully" };
    } catch (err) {
      if (err instanceof NotFoundException) throw err;
      throw new InternalServerErrorException({ message: 'Failed to update assessment', error: err });
    }
  }

  async delete(id: string) {
    try {
      const assessment = await this.assessmentModel.findByIdAndDelete(id);
      if (!assessment) throw new NotFoundException('Assessment not found');
      return { ok: true, message: "Assessment deleted successfully" };
    } catch (err) {
      if (err instanceof NotFoundException) throw err;
      throw new InternalServerErrorException({ message: 'Failed to delete assessment', error: err });
    }
  }

  private async ensureNotInProgress(assessmentId: string) {
    const activePrepare = await this.prepareAssessmentModel.findOne({
      assessmentId: new Types.ObjectId(assessmentId),
      status: 'in_progress'
    });
    if (activePrepare) {
      throw new BadRequestException('Cannot modify questions while an assessment is in progress');
    }
  }

  async addQuestion(assessmentId: string, questionData: CreateQuestionDto) {
    await this.ensureNotInProgress(assessmentId);
    try {
      const assessment = await this.assessmentModel.findByIdAndUpdate(
        assessmentId,
        { $push: { questions: questionData } },
        { new: true }
      );
      if (!assessment) throw new NotFoundException('Assessment not found');
      return { ok: true, data: assessment, message: "Question added successfully" };
    } catch (err) {
      if (err instanceof NotFoundException || err instanceof BadRequestException) throw err;
      throw new InternalServerErrorException({ message: 'Failed to add question', error: err });
    }
  }

  async updateQuestion(assessmentId: string, questionId: string, questionData: UpdateQuestionDto) {
    await this.ensureNotInProgress(assessmentId);
    try {
      const updateFields: any = {};
      for (const [key, value] of Object.entries(questionData)) {
        updateFields[`questions.$.${key}`] = value;
      }
      
      const assessment = await this.assessmentModel.findOneAndUpdate(
        { _id: assessmentId, 'questions._id': questionId },
        { $set: updateFields },
        { new: true }
      );
      if (!assessment) throw new NotFoundException('Assessment or Question not found');
      return { ok: true, data: assessment, message: "Question updated successfully" };
    } catch (err) {
      if (err instanceof NotFoundException || err instanceof BadRequestException) throw err;
      throw new InternalServerErrorException({ message: 'Failed to update question', error: err });
    }
  }

  async deleteQuestion(assessmentId: string, questionId: string) {
    await this.ensureNotInProgress(assessmentId);
    try {
      const assessment = await this.assessmentModel.findByIdAndUpdate(
        assessmentId,
        { $pull: { questions: { _id: questionId } } },
        { new: true }
      );
      if (!assessment) throw new NotFoundException('Assessment not found');
      return { ok: true, data: assessment, message: "Question deleted successfully" };
    } catch (err) {
      if (err instanceof NotFoundException || err instanceof BadRequestException) throw err;
      throw new InternalServerErrorException({ message: 'Failed to delete question', error: err });
    }
  }
}