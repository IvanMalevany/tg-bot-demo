import { Injectable } from '@nestjs/common';

@Injectable()
export class FrontService {
  getPing(): string {
    return 'Hello World!';
  }
}
