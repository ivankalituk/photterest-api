import { BadRequestException, Injectable } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { RegistrationDTO } from './dto/registration.dto';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import { userSelect } from '../users/selects/user.select';

@Injectable()
export class RegistrationService {
  constructor(
    private readonly prisma: PrismaService,
    private authService: AuthService,
  ) {}

  async register(dto: RegistrationDTO) {
    const existingUser = await this.prisma.users.findUnique({
      where: { email: dto.email },
    });

    if (existingUser) {
      throw new BadRequestException('Email already exists');
    }

    const hashedPassword = await bcrypt.hash(dto.password, 10);

    const user = await this.prisma.users.create({
      data: {
        nickname: dto.email,
        email: dto.email,
        birth_date: new Date(dto.birth_date),
        password_hash: hashedPassword,
      },
      select: userSelect,
    });

    const token = this.authService.generateToken(user);

    return {
      user,
      token,
    };
  }
}
