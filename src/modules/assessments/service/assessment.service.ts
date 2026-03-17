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

  update(id: string, data: any) {
    return this.assessmentRepo.update(id, data);
  }

  delete(id: string) {
    return this.assessmentRepo.delete(id);
  }

  addQuestion(assessmentId: string, questionData: any) {
    return this.assessmentRepo.addQuestion(assessmentId, questionData);
  }

  updateQuestion(assessmentId: string, questionId: string, questionData: any) {
    return this.assessmentRepo.updateQuestion(assessmentId, questionId, questionData);
  }

  deleteQuestion(assessmentId: string, questionId: string) {
    return this.assessmentRepo.deleteQuestion(assessmentId, questionId);
  }
}