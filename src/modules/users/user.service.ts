import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string) {
    const user = await this.prisma.users.findUnique({
      where: { id: id },
      select: {
        id: true,
        nickname: true,
        email: true,
        birth_date: true,
        avatar_url: true,
        google_id: true,
        role: true,
        created_at: true,
        updated_at: true,
      },
    });

    return user;
  }
}
