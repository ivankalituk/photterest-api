import { Controller, Get, Param, Query, Req, UseGuards } from '@nestjs/common';
import { UsersService } from './user.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { JwtUser } from '../auth/interfaces/jwt-user.interface';
import { QueryOptionsPipe } from 'src/shared/queryOptions/pipes/query-options.pipe';
import type { QueryOptionsType } from 'src/shared/queryOptions/interfaces/query-options.interface';

interface AuthenticatedRequest extends Request {
  user: JwtUser;
}

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('')
  getAll(
    @Query(QueryOptionsPipe) options: QueryOptionsType
  ){
    return this.usersService.findAll(options)
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  getMe(@Req() req: AuthenticatedRequest) {
    return this.usersService.findById(req.user.id);
  }

  @Get(':id')
  getUserById(@Param('id') id: string) {
    return this.usersService.findById(id);
  }
}
