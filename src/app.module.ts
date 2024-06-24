import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BooksnestModule } from './g/booksnest/booksnest.module';

@Module({
  imports: [BooksnestModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
