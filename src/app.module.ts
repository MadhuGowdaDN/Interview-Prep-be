import { DatabaseModule } from '@config/database';
import { AssessmentGenerateModule } from '@modules/assessment-generate';
import { AssessmentModule } from '@modules/assessments';
import { AssessmentsPrepareModule } from '@modules/assessments-prepare';
import { AuthModule } from '@modules/auth/auth.module';
import { UsersModule } from '@modules/users';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [DatabaseModule, UsersModule, AuthModule, AssessmentGenerateModule, AssessmentModule,
    AssessmentsPrepareModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
