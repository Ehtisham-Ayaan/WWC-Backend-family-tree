import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class FamilyMember {
  @PrimaryGeneratedColumn()
  @ApiProperty({ example: 1, description: 'The unique identifier of the family member' })
  id: number;

  @Column()
  @ApiProperty({ example: 'John Doe', description: 'The name of the family member' })
  name: string;

  @ManyToOne(() => FamilyMember, member => member.children)
  @ApiProperty({ type: () => FamilyMember, description: 'The parent of the family member' })
  parent: FamilyMember;

  @OneToMany(() => FamilyMember, member => member.parent)
  @ApiProperty({ type: [FamilyMember], description: 'The children of the family member' })
  children: FamilyMember[];
}
