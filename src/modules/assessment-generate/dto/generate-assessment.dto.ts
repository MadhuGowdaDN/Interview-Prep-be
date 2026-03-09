import { IsNumber, IsString } from 'class-validator';

export class GenerateAssessmentDto {

  @IsString()
  topic: string;

  @IsString()
  skill: string;

  @IsString()
  questionType: 'mcq' | 'short' | 'coding';

  @IsNumber()
  numberOfQuestions: number;

  @IsNumber()
  duration: number;

  @IsString()
  difficulty: 'easy' | 'medium' | 'hard';
}