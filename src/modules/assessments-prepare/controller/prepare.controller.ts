import { SubmitQuestionAnswerDto } from "@modules/assessments-prepare/dto";
import { PrepareAssessmentService } from "@modules/assessments-prepare/service";
import { Controller, Get, Post, Query } from "@nestjs/common";

@Controller('prepare-assessments')
export class PrepareAssessmentController {

  constructor(private service: PrepareAssessmentService) { }

  // @Post('start')
  // startAssessment(@Body() dto, @Req() req) {

  //   const userId = req.user.id;

  //   return this.service.startAssessment(
  //     userId,
  //     dto.assessmentId
  //   );
  // }

  @Get('fetch-time')
  fetchTime(@Query() id) {

    return this.service.fetchTime(
      id
    );
  }

  @Post('answer')
  answer(
    @Query() dto: SubmitQuestionAnswerDto,
  ) {
    return this.service.answer(dto);
  }

  @Post('submit')
  submit(
    @Query('id') id: string,
  ) {
    return this.service.submitAssessment(id);
  }
}