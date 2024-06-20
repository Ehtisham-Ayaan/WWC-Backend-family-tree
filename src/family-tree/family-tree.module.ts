import { Module } from '@nestjs/common';
import { FamilyTreeService } from './family-tree.service';
import { FamilyTreeController } from './family-tree.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FamilyMember } from './family-member.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FamilyMember])],

  providers: [FamilyTreeService],
  controllers: [FamilyTreeController]
})
export class FamilyTreeModule { }