import { Body, Controller, Post } from '@nestjs/common';
import { GenerateAssessmentDto } from '../dto/generate-assessment.dto';
import { AssessmentAIService } from '../service/generate.service';

@Controller('assessment-ai')
export class AssessmentAIController {

  constructor(private aiService: AssessmentAIService) { }

  @Post('generate')
  async generateQuestions(
    @Body() dto: GenerateAssessmentDto,
  ) {
    return this.aiService.generateQuestions(dto);
  }
}