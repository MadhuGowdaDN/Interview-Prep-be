import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type AssessmentMappingDocument = HydratedDocument<AssessmentMapping>;

@Schema({ timestamps: true })
export class AssessmentMapping {

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

    @Prop({
        type: Types.ObjectId,
        ref: 'PrepareAssessment',
        default: null
    })
    prepareAssessmentId: Types.ObjectId; // only one prepare session

    @Prop({ required: true, unique: true })
    assessmentName: string;

    @Prop({
        enum: ['pending', 'started', 'completed'],
        default: 'pending'
    })
    status: string;
}

export const AssessmentMappingSchema =
    SchemaFactory.createForClass(AssessmentMapping);

AssessmentMappingSchema.index({
    assessmentName: 1,
    userId: 1
}, { unique: true });