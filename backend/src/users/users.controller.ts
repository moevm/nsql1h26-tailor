import { UserPayload } from '@/common/interfaces/user.interface';
import { Body, Controller, Put, Req } from '@nestjs/common';

import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Put('me')
  updateCurrent(
    @Body() updateUserDto: UpdateUserDto,
    @Req() req: Request & UserPayload,
  ) {
    return this.usersService.updateCurrentUser(req.user.sub, updateUserDto);
  }
}
