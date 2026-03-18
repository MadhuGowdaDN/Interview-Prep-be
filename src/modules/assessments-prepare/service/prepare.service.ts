import { SubmitQuestionAnswerDto } from "@modules/assessments-prepare/dto";
import { AssessmentMappingRepository, PrepareAssessmentRepository } from "@modules/assessments-prepare/repository";
import { AssessmentRepository } from "@modules/assessments/repository";
import { BadRequestException, Injectable } from "@nestjs/common";

@Injectable()
export class PrepareAssessmentService {

  constructor(
    private prepareRepo: PrepareAssessmentRepository,
    private assessmentRepo: AssessmentRepository,
    private assessmentMappingRepo: AssessmentMappingRepository,
  ) { }

  async startAssessment(userId: string, assessmentId: string) {

    try {
      const record = await this.prepareRepo.create({
        assessmentId,
        userId,
        startedAt: new Date(),
        status: 'in_progress'
      });

      return record;
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  async fetchTime(id: string,) {
    const mapping = await this.assessmentMappingRepo.findById(id);
    if (!mapping) throw new Error('Assessment Mapping not found');
    const prepareAssessmentId = mapping.prepareAssessmentId.toString();
    const attempt = await this.prepareRepo.findById(prepareAssessmentId);
    if (!attempt) throw new Error('Prepare assessment not found');
    const assessment = await this.assessmentRepo.findById(attempt.assessmentId.toString());
    if (!assessment) throw new Error('Assessment not found');
    const now = new Date();
    const endTime = new Date(attempt.startedAt.getTime() + assessment.duration * 60000);
    const remainingSeconds =
      Math.max(0, Math.floor((endTime.getTime() - now.getTime()) / 1000));

    if (attempt.status === 'completed') {
      throw new BadRequestException("Assessment completed");
    }
    if (attempt.status === 'expired') {
      throw new BadRequestException("Assessment expired");
    }
    if (now > endTime) {
      attempt.status = 'expired';
      await attempt.save();
      throw new BadRequestException('Assessment time expired');
    }

    return { time: remainingSeconds };
  }

  async fetchQuestions(id: string,) {
    const mapping = await this.assessmentMappingRepo.findById(id);
    if (!mapping) throw new Error('Assessment Mapping not found');
    const prepareAssessmentId = mapping.prepareAssessmentId.toString();
    const attempt = await this.prepareRepo.findById(prepareAssessmentId);
    if (!attempt) throw new Error('Prepare assessment not found');
    const assessment = await this.assessmentRepo
      .findById(attempt.assessmentId.toString())
      .lean();
    if (!assessment) throw new Error('Assessment not found');
    const questionsData = assessment.questions;
    const alteredData = questionsData?.map(item => ({ ...item, id: item?.['_id'] }));
    return alteredData;
  }

  async answer(anserDto: SubmitQuestionAnswerDto) {

    const { id, prepareAssessmentId } = anserDto;
    const prepare = await this.prepareRepo.findById(id);
    if (!prepare) throw new Error('Prepare assessment not found');

    if (!prepare.status) throw new Error('Prepare assessment already submitted');

    const assessment = await this.assessmentRepo.findById(
      prepare.assessmentId.toString()
    );

    if (!assessment) throw new Error('Assessment not found');

    prepare.status = "completed";

    return {
      ok: true,
      message: "Assessment Completed Successfully!"
    }

    // let score = 0;

    // const evaluatedAnswers = answers.map(ans => {

    //   const question = assessment.questions.find(
    //     q => (q as any)._id.toString() === ans.questionId
    //   );

    //   const isCorrect = question?.correctAnswer === ans.selectedAnswer;

    //   if (isCorrect) score++;

    //   return {
    //     ...ans,
    //     isCorrect
    //   };
    // });

    // return this.prepareRepo.update(id, {
    //   answers: evaluatedAnswers,
    //   score,
    //   status: 'completed',
    //   submittedAt: new Date()
    // });
  }

  async submitAssessment(id: string) {

    const prepare = await this.prepareRepo.findById(id);
    if (!prepare) throw new Error('Prepare assessment not found');

    if (!prepare.status) throw new Error('Prepare assessment already submitted');

    const assessment = await this.assessmentRepo.findById(
      prepare.assessmentId.toString()
    );

    if (!assessment) throw new Error('Assessment not found');

    prepare.status = "completed";

    return {
      ok: true,
      message: "Assessment Completed Successfully!"
    }

    // let score = 0;

    // const evaluatedAnswers = answers.map(ans => {

    //   const question = assessment.questions.find(
    //     q => (q as any)._id.toString() === ans.questionId
    //   );

    //   const isCorrect = question?.correctAnswer === ans.selectedAnswer;

    //   if (isCorrect) score++;

    //   return {
    //     ...ans,
    //     isCorrect
    //   };
    // });

    // return this.prepareRepo.update(id, {
    //   answers: evaluatedAnswers,
    //   score,
    //   status: 'completed',
    //   submittedAt: new Date()
    // });
  }
}