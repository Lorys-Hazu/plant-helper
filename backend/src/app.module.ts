import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { PlantsModule } from './plants/plants.module';

@Module({
  imports: [DatabaseModule, PlantsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
