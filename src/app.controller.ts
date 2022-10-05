import { Controller, Get, Res, StreamableFile } from '@nestjs/common';
import { Response } from 'express';
import { createReadStream } from 'fs';
import { join } from 'path';
import { lastValueFrom, map } from 'rxjs';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('generate')
  async getFile(@Res({ passthrough: true }) res: Response) {
    const buffer = await lastValueFrom(
      this.appService
        .generatePDFToStream('templates')
        .pipe(map((resp) => resp)),
    );
    res
      .set({
        // pdf
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename=test.pdf',
        'Content-Length': buffer.length,
        // prevent cache
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        Pragma: 'no-cache',
        Expires: 0,
      })
      .end(buffer);
  }
}
