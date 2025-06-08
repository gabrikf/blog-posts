import { Module } from '@nestjs/common';
import { PostModule } from './posts/post.module';

@Module({
  imports: [PostModule],
  exports: [],
  providers: [],
})
export class AppModule {}
