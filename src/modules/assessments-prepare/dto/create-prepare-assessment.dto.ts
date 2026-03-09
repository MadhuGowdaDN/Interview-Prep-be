import { IsMongoId, IsNotEmpty } from 'class-validator';

export class CreatePrepareAssessmentDto {

  @IsMongoId()
  assessmentId: string;
}

import { IsArray, IsString } from 'class-validator';

export class SubmitAnswerDto {

  @IsString()
  questionId: string;

  @IsString()
  selectedAnswer: string;
}

export class SubmitAssessmentDto {

  @IsArray()
  answers: SubmitAnswerDto[];
}

export class SubmitQuestionAnswerDto {

  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  prepareAssessmentId: string;
}