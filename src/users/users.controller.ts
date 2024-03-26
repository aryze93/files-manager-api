import { Controller, Get, Request } from '@nestjs/common';

import { UsersService } from './users.service';

@Controller('v1/users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get('me')
  async userProfile(@Request() { user }): Promise<any> {
    const userProfile = await this.userService.findOneWithUserName(
      user.username,
    );
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...result } = userProfile;
    return result;
  }
}
