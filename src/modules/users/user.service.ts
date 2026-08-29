import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { userSelect } from './selects/user.select';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string) {
    const user = await this.prisma.users.findUnique({
      where: { id: id },
      select: userSelect
    });

    return user;
  }
}
