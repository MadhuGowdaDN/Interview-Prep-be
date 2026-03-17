import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';


import { AssessmentController } from '@modules/assessments/controller';
import { AssessmentRepository } from '@modules/assessments/repository';
import { Assessment, AssessmentSchema } from '@modules/assessments/schemas';
import { AssessmentService } from '@modules/assessments/service';
import { PrepareAssessment, PrepareAssessmentSchema } from '@modules/assessments-prepare/schemas';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Assessment.name, schema: AssessmentSchema },
      { name: PrepareAssessment.name, schema: PrepareAssessmentSchema }
    ]),
  ],
  controllers: [AssessmentController],
  providers: [AssessmentService, AssessmentRepository],
  exports: [AssessmentService, AssessmentRepository],
})
export class AssessmentModule { }
