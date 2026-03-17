import { AssessmentMapping } from "@modules/assessments-prepare/schemas";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

@Injectable()
export class AssessmentMappingRepository {

    constructor(
        @InjectModel(AssessmentMapping.name)
        private model: Model<AssessmentMapping>,
    ) { }

    findById(id: string) {
        return this.model.findById(id);
    }
}