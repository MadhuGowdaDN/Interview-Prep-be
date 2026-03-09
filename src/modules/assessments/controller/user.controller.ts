import { CreateAssessmentDto } from '@modules/assessments/dto';
import { AssessmentService } from '@modules/assessments/service';
import { Body, Controller, Get, Param, Post } from '@nestjs/common';

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
}