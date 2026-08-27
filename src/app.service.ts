import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  getSpecialHello(): string {
    return 'Special Hello!';
  }
}
