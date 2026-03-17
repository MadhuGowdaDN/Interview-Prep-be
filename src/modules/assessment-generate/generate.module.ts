import { Module } from '@nestjs/common';
import { AssessmentAIController } from './controller/generate.controller';
import { GeminiService } from './service/gemini.service';
import { AssessmentAIService } from './service/generate.service';

@Module({
  controllers: [AssessmentAIController],
  providers: [
    AssessmentAIService,
    GeminiService
  ],
})
export class AssessmentGenerateModule { }