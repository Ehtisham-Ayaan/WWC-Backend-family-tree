import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FamilyTreeModule } from './family-tree/family-tree.module';
import { FamilyMember } from './family-tree/family-member.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'test',
      password: 'test',
      database: 'wwc',
      entities: [FamilyMember],
      synchronize: true, // Use synchronize: true only in development
    }),
    FamilyTreeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }