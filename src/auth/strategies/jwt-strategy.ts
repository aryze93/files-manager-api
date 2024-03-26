import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from 'src/users/users.service';

export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 's3cr3t',
    });
  }

  async validate(payload: any) {
    return this._checkAdminUser(payload);
  }

  private async _checkAdminUser(payload: any) {
    return { user: payload.sub, username: payload.username };
  }
}
