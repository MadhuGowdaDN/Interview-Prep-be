import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';


import { AssessmentController } from '@modules/assessments/controller';
import { AssessmentRepository } from '@modules/assessments/repository';
import { Assessment, AssessmentSchema } from '@modules/assessments/schemas';
import { AssessmentService } from '@modules/assessments/service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Assessment.name, schema: AssessmentSchema }]),
  ],
  controllers: [AssessmentController],
  providers: [AssessmentService, AssessmentRepository],
  exports: [AssessmentService, AssessmentRepository],
})
export class AssessmentModule { }
