import { CurrentUser } from '@common/decorators';
import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateAssessmentMappingDto } from '../dto';
import { AssessmentMappingService } from '../service/assessment-mapping.service';

@Controller('assessment-mapping')
export class AssessmentMappingController {
    constructor(private readonly mappingService: AssessmentMappingService,
    ) { }

    @Post()
    create(
        @Body() createDto: CreateAssessmentMappingDto,
        @CurrentUser() user: any,
    ) {

        const userId = user?.userId;
        return this.mappingService.create(createDto, userId);
    }

    @Patch('start-prepare')
    startPrepareAssessment(
        @Body('id') id: string,
        @CurrentUser() user: any,
    ) {
        const userId = user.userId;
        return this.mappingService.startPrepareAssessment(id, userId);
    }

    @Get()
    findAll() {
        return this.mappingService.findAll();
    }

    @Get('details')
    findOne(@Param('id') id: string) {
        return this.mappingService.findOne(id);
    }

    // @Patch(':id')
    // update(@Param('id') id: string, @Body() updateDto: UpdateAssessmentMappingDto) {
    //     return this.mappingService.update(id, updateDto);
    // }

    @Delete()
    remove(@Param('id') id: string) {
        return this.mappingService.remove(id);
    }

    // // Optional endpoint to add a prepare assessment to an existing mapping
    // @Patch(':id/add-prepare-assessment/:prepareId')
    // addPrepareAssessment(
    //     @Param('id') id: string,
    //     @Param('prepareId') prepareId: string,
    // ) {
    //     return this.mappingService.addPrepareAssessment(id, new Types.ObjectId(prepareId));
    // }
}