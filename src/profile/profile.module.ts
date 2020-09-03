import { Module } from '@nestjs/common';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';
import { TypeOrmModule } from '@nestjs/typeorm'
import { ProfileRepository } from './profile.repository'
import { PassportModule } from '@nestjs/passport'

@Module({
  imports:[
    PassportModule.register({ defaultStrategy: 'jwt' }),
    TypeOrmModule.forFeature([ ProfileRepository ])
  ],
  controllers: [ProfileController],
  providers: [ProfileService],
  exports:[PassportModule]
})
export class ProfileModule {}
