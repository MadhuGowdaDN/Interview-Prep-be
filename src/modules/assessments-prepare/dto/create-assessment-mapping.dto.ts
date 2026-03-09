import { IsMongoId, IsNotEmpty, IsOptional } from 'class-validator';
import { Types } from 'mongoose';

export class CreateAssessmentMappingDto {
    @IsNotEmpty()
    assessmentName: 'string';

    @IsNotEmpty()
    @IsMongoId()
    assessmentId: Types.ObjectId;

    // @IsNotEmpty()
    // @IsMongoId()
    // userId: Types.ObjectId;

    // @IsOptional()
    // @IsMongoId({ each: true })
    // prepareAssessmentIds?: Types.ObjectId[];

    @IsOptional()
    status?: string;
}