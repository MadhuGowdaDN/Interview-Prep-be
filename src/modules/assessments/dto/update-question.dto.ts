import { PartialType } from '@nestjs/swagger';
import { CreateQuestionDto } from './create-assessment.dto';

export class UpdateQuestionDto extends PartialType(CreateQuestionDto) {}
