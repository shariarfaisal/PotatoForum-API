import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { TypeOrmModule } from '@nestjs/typeorm'
import { TaskRepository } from './task.repository'
import { UserModule } from '../user/user.module'

@Module({
  imports: [
    TypeOrmModule.forFeature([TaskRepository]),
    UserModule
  ],
  controllers: [TasksController],
  providers: [TasksService]
})
export class TasksModule {}
