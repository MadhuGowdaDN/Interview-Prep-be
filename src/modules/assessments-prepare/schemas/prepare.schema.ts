import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type PrepareAssessmentDocument = HydratedDocument<PrepareAssessment>;

@Schema()
export class Answer {

  @Prop({ required: true })
  questionId: string;

  @Prop()
  selectedAnswer: string;

  @Prop()
  isCorrect: boolean;
}

export const AnswerSchema = SchemaFactory.createForClass(Answer);

@Schema({ timestamps: true })
export class PrepareAssessment {

  @Prop({
    type: Types.ObjectId,
    ref: 'Assessment',
    required: true
  })
  assessmentId: Types.ObjectId;

  @Prop({
    type: Types.ObjectId,
    ref: 'User',
    required: true
  })
  userId: Types.ObjectId;

  @Prop({ type: [AnswerSchema], default: [] })
  answers: Answer[];

  @Prop({ default: 0 })
  score: number;

  @Prop({ default: 'new' })
  status: string;

  @Prop()
  startedAt: Date;

  @Prop()
  submittedAt: Date;
}

export const PrepareAssessmentSchema =
  SchemaFactory.createForClass(PrepareAssessment);