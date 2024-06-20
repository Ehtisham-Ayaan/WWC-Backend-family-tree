import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FamilyMember } from './family-member.entity';

@Injectable()
export class FamilyTreeService {
  constructor(
    @InjectRepository(FamilyMember)
    private familyMemberRepository: Repository<FamilyMember>,
  ) {}

  async addMember(ancestorId: number, memberName: string): Promise<FamilyMember> {
    const ancestor = await this.familyMemberRepository.findOne({ where: { id: ancestorId }, relations: ['children'] });
    const newMember = this.familyMemberRepository.create({ name: memberName, parent: ancestor });
    return this.familyMemberRepository.save(newMember);
  }

  async getFamilyTreeByName(name: string): Promise<FamilyMember> {
    const member = await this.familyMemberRepository.findOne({ where: { name }, relations: ['parent'] });
    if (!member) {
      throw new NotFoundException(`Member with name ${name} not found`);
    }
    return this.getCompleteTree(member);
  }

  private async getCompleteTree(member: FamilyMember): Promise<FamilyMember> {
    // Fetch the member with all their children
    const memberWithChildren = await this.familyMemberRepository.findOne({
      where: { id: member.id },
      relations: ['children'],
    });

    // Recursively fetch children
    memberWithChildren.children = await Promise.all(
      memberWithChildren.children.map(child => this.getCompleteTree(child)),
    );

    // If the member has a parent, fetch the parent and link the current member
    if (memberWithChildren.parent) {
      const parentWithAncestors = await this.getCompleteTree(memberWithChildren.parent);
      memberWithChildren.parent = parentWithAncestors;
    }

    return memberWithChildren;
  }
}
