import { SkipAuth } from '@/common/guards/auth.guard';
import { Body, Controller, Get, Post, Req } from '@nestjs/common';

import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('user')
  getCurrentUser(
    @Req()
    req: Request & { user: { sub: string; email: string; role: string } },
  ) {
    return this.authService.getCurrentUser(req.user.email);
  }

  @SkipAuth()
  @Post('login')
  signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto);
  }

  @SkipAuth()
  @Post('register')
  signUp(@Body() signUpDto: SignUpDto) {
    return this.authService.signUp(signUpDto);
  }
}
