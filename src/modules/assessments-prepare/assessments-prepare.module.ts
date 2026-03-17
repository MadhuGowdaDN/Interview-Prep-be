import { PrepareAssessmentController } from '@modules/assessments-prepare/controller';
import { AssessmentMappingController } from '@modules/assessments-prepare/controller/assessment-mapping.controller';
import { AssessmentMappingRepository, PrepareAssessmentRepository } from '@modules/assessments-prepare/repository';
import { AssessmentMapping, AssessmentMappingSchema, PrepareAssessment, PrepareAssessmentSchema } from '@modules/assessments-prepare/schemas';
import { PrepareAssessmentService } from '@modules/assessments-prepare/service';
import { AssessmentMappingService } from '@modules/assessments-prepare/service/assessment-mapping.service';
import { AssessmentRepository } from '@modules/assessments/repository';
import { Assessment, AssessmentSchema } from '@modules/assessments/schemas';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';



@Module({
  imports: [
    JwtModule.register({}),
    MongooseModule.forFeature([
      { name: Assessment.name, schema: AssessmentSchema },
      { name: AssessmentMapping.name, schema: AssessmentMappingSchema },
      { name: PrepareAssessment.name, schema: PrepareAssessmentSchema }
    ]),
  ],
  controllers: [PrepareAssessmentController,
    AssessmentMappingController
  ],
  providers: [PrepareAssessmentService, PrepareAssessmentRepository, AssessmentMappingRepository,
    AssessmentMappingService,
    AssessmentRepository,
  ],
  exports: [PrepareAssessmentService, PrepareAssessmentRepository, AssessmentMappingService],
})
export class AssessmentsPrepareModule { }
