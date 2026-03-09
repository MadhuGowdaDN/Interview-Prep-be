import { PrepareAssessmentService } from '@modules/assessments-prepare/service/prepare.service';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateAssessmentMappingDto, UpdateAssessmentMappingDto } from '../dto';
import { AssessmentMapping, AssessmentMappingDocument } from '../schemas';

@Injectable()
export class AssessmentMappingService {
    constructor(
        @InjectModel(AssessmentMapping.name)
        private mappingModel: Model<AssessmentMappingDocument>,
        private readonly prepareAssessmentService: PrepareAssessmentService
    ) { }

    async create(createDto: CreateAssessmentMappingDto, userId: string) {

        try {

            const created = new this.mappingModel({
                ...createDto,
                userId,
            });

            const result = await created.save();

            return {
                ok: true,
                error: false,
                message: "Assessment assigned successfully",
                code: 201,
                data: result
            };

        } catch (err) {

            // Duplicate key error
            if (err.code === 11000) {
                throw new BadRequestException({
                    ok: false,
                    error: true,
                    message: "Assessment already assigned to this user",
                    code: 400
                });
            }

            // Mongoose validation
            if (err.name === "ValidationError") {
                throw new BadRequestException({
                    ok: false,
                    error: true,
                    message: err.message,
                    code: 400
                });
            }

            // fallback
            throw new BadRequestException({
                ok: false,
                error: true,
                message: "Failed to create assessment mapping",
                code: 500
            });
        }
    }

    async startPrepareAssessment(mappingId: string, userId: string) {
        const mapping = await this.mappingModel.findById(mappingId).exec();
        console.log("mapping ", mapping)
        if (!mapping) throw new NotFoundException(`Mapping with id ${mappingId} not found`);
        if (mapping.prepareAssessmentId) throw new BadRequestException("This assessment already started");
        console.log("mapping ", mapping)
        const result = await this.prepareAssessmentService.startAssessment(userId, mapping.assessmentId.toString());
        console.log("result ", result);
        mapping.prepareAssessmentId = result?._id;
        return mapping.save();
    }



    async findAll() {
        return this.mappingModel.find()
            .populate('assessmentId')
            .populate('userId')
            .populate('prepareAssessmentId')
            .exec();
    }

    async findOne(id: string) {
        const mapping = await this.mappingModel.findById(id)
            .populate('assessmentId')
            .populate('userId')
            .populate('prepareAssessmentIds')
            .exec();
        if (!mapping) throw new NotFoundException(`Mapping with id ${id} not found`);
        return mapping;
    }

    async update(id: string, updateDto: UpdateAssessmentMappingDto) {
        const updated = await this.mappingModel.findByIdAndUpdate(id, updateDto, { new: true }).exec();
        if (!updated) throw new NotFoundException(`Mapping with id ${id} not found`);
        return updated;
    }

    async remove(id: string) {
        const deleted = await this.mappingModel.findByIdAndDelete(id).exec();
        if (!deleted) throw new NotFoundException(`Mapping with id ${id} not found`);
        return { deleted: true };
    }

    // Optional helper to add a PrepareAssessment id to existing mapping
    async addPrepareAssessment(mappingId: string, prepareAssessmentId: Types.ObjectId) {
        const mapping = await this.mappingModel.findById(mappingId).exec();
        if (!mapping) throw new NotFoundException(`Mapping with id ${mappingId} not found`);
        if (mapping.prepareAssessmentId) throw new BadRequestException("This assessment already started")
        mapping.prepareAssessmentId = prepareAssessmentId;
        return mapping.save();
    }
}