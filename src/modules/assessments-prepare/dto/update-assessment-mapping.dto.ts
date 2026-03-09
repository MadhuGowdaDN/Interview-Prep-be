import { PartialType } from '@nestjs/mapped-types';
import { CreateAssessmentMappingDto } from './create-assessment-mapping.dto';

export class UpdateAssessmentMappingDto extends PartialType(CreateAssessmentMappingDto) { }