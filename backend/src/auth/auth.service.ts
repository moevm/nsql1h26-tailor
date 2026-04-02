import { Injectable } from '@nestjs/common';

import { SignUpDto } from './dto/sign-up.dto';

@Injectable()
export class AuthService {
  async signIn(email: string, password: string) {}
  async signUp(signUpDto: SignUpDto) {}
}
