import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { userSelect } from './selects/user.select';
import { QueryOptionsType } from 'src/shared/queryOptions/interfaces/query-options.interface';
import { createPaginatedResponse } from 'src/shared/createPaginatedResponse/createPaginatedResponse';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string) {
    const user = await this.prisma.users.findUnique({
      where: { id: id },
      select: userSelect,
    });

    return user;
  }
  
  async findAll(options: QueryOptionsType){
    const [users, totalElements] = await Promise.all([this.prisma.users.findMany({
      orderBy: options.orderBy,
      skip: options.skip,
      take: options.take,
      select: userSelect,
    }),
    this.prisma.users.count()
  ])
    

    return createPaginatedResponse(
      users,
      totalElements,
      options.skip / options.take + 1,
      options.take
    );
  }
}
