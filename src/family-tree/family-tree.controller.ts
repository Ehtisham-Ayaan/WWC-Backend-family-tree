import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { FamilyTreeService } from './family-tree.service';
import { AddMemberDto } from './dto/add-member.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { FamilyMember } from './family-member.entity';

@ApiTags('family-tree')
@Controller('family-tree')
export class FamilyTreeController {
  constructor(private readonly familyTreeService: FamilyTreeService) {}

  @Post('add-member')
  @ApiOperation({ summary: 'Add a new family member' })
  @ApiResponse({ status: 201, description: 'The record has been successfully created.', type: FamilyMember })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  async addMember(@Body() addMemberDto: AddMemberDto) {
    return this.familyTreeService.addMember(addMemberDto.ancestorId, addMemberDto.memberName);
  }

  @Get(':name')
  @ApiOperation({ summary: 'Get the family tree of a specific member by name' })
  @ApiParam({ name: 'name', type: String, description: 'The name of the family member' })
  @ApiResponse({ status: 200, description: 'Return the family tree', type: FamilyMember })
  async getFamilyTreeByName(@Param('name') name: string) {
    return this.familyTreeService.getFamilyTreeByName(name);
  }
}
