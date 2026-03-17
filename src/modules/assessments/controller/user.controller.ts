import { CreateAssessmentDto, UpdateAssessmentDto, CreateQuestionDto, UpdateQuestionDto } from '@modules/assessments/dto';
import { AssessmentService } from '@modules/assessments/service';
import { Body, Controller, Get, Param, Post, Put, Delete } from '@nestjs/common';


@Controller('assessments')
export class AssessmentController {

  constructor(private service: AssessmentService) { }

  @Post()
  create(@Body() dto: CreateAssessmentDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll() {
    return this.service.getAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.getById(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateAssessmentDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.delete(id);
  }

  @Post(':id/questions')
  addQuestion(@Param('id') id: string, @Body() dto: CreateQuestionDto) {
    return this.service.addQuestion(id, dto);
  }

  @Put(':id/questions/:questionId')
  updateQuestion(
    @Param('id') id: string,
    @Param('questionId') questionId: string,
    @Body() dto: UpdateQuestionDto
  ) {
    return this.service.updateQuestion(id, questionId, dto);
  }

  @Delete(':id/questions/:questionId')
  removeQuestion(
    @Param('id') id: string,
    @Param('questionId') questionId: string
  ) {
    return this.service.deleteQuestion(id, questionId);
  }
}