import { Injectable } from '@nestjs/common';
import { PDFOptions, PDFService } from '@t00nday/nestjs-pdf';

@Injectable()
export class AppService {
  constructor(private readonly pdfService: PDFService) { }

  getHello(): string {
    return 'Hello World!';
  }

  generatePDFToStream(template: string, options?: PDFOptions) {
    return this.pdfService.toBuffer(template, options); // returns Observable<Readable>;
  }
}
