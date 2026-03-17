import { QuestionType } from '@modules/assessments/schemas';
import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateQuestionDto {

  @IsString()
  question: string;

  @IsArray()
  options: string[];

  @IsString()
  correctAnswer: string;

  @IsString()
  type: QuestionType;
}

export class CreateAssessmentDto {

  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsNumber()
  duration: number;

  @IsArray()
  questions: CreateQuestionDto[];
}