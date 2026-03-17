import { PrepareAssessment } from "@modules/assessments-prepare/schemas";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

@Injectable()
export class PrepareAssessmentRepository {

  constructor(
    @InjectModel(PrepareAssessment.name)
    private model: Model<PrepareAssessment>,
  ) { }

  create(data) {
    return this.model.create(data);
  }

  findById(id: string) {
    return this.model.findById(id);
  }

  update(id: string, data) {
    return this.model.findByIdAndUpdate(id, data, { new: true });
  }
}