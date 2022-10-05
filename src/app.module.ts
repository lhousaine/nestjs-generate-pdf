import { Module } from '@nestjs/common';
import { PDFModule } from '@t00nday/nestjs-pdf';
import * as path from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    PDFModule.register({
      isGlobal: true,
      view: {
        root: path.join(process.cwd()),
        engine: 'handlebars',
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
