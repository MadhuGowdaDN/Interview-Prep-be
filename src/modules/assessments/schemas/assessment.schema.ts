import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type AssessmentDocument = HydratedDocument<Assessment>;

export enum QuestionType {
    MCQ = 'mcq',
    TEXT = 'text',
    CODING = 'coding',
}

@Schema({ timestamps: true })
export class Question {

    @Prop({ required: true })
    skill: string;

    @Prop({ required: true })
    question: string;

    @Prop({ type: [String], default: [] })
    options: string[];

    @Prop()
    correctAnswer: string;

    @Prop({ default: "easy" })
    difficulty: string;

    @Prop({
        enum: QuestionType,
        default: QuestionType.MCQ
    })
    type: QuestionType;
}

export const QuestionSchema = SchemaFactory.createForClass(Question);

@Schema({ timestamps: true })
export class Assessment {

    @Prop({ required: true })
    title: string;

    @Prop()
    description: string;

    @Prop({ default: 0 })
    duration: number; // minutes

    @Prop({ type: [QuestionSchema], default: [] })
    questions: Question[];

    @Prop({ default: true })
    isActive: boolean;

    @Prop({ type: Types.ObjectId, ref: 'User' })
    createdBy: Types.ObjectId;
}

export const AssessmentSchema = SchemaFactory.createForClass(Assessment);