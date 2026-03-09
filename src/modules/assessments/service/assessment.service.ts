import { CreateAssessmentDto } from "@modules/assessments/dto";
import { AssessmentRepository } from "@modules/assessments/repository";
import { Injectable } from "@nestjs/common";

@Injectable()
export class AssessmentService {

  constructor(
    private assessmentRepo: AssessmentRepository,
  ) { }

  create(dto: CreateAssessmentDto) {
    return this.assessmentRepo.create(dto);
  }

  getAll() {
    return this.assessmentRepo.findAll();
  }

  getById(id: string) {
    return this.assessmentRepo.findById(id);
  }
}