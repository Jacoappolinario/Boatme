import { sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { IPhoneVerifyProvider } from '@shared/container/providers/PhoneVerifyProvider/IPhoneVerifyProvider';
import { AppError } from '@shared/errors/AppError';

interface IRequest {
  phone: string;
  code: string;
}

interface IResponse {
  user: {
    name: string;
    email: string;
  };
  token: string;
}

@injectable()
class CheckSmsCodeUseCase {
  constructor(
    @inject('TwilioVerifyProvider')
    private phoneVerifyProvider: IPhoneVerifyProvider,
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async execute({ phone, code }: IRequest): Promise<IResponse> {
    if (!phone || code.length !== 4) {
      throw new AppError(
        'Error in verification, check the number or code',
        400,
      );
    }

    const user = await this.usersRepository.findByPhone(phone);

    if (!user) {
      throw new AppError(
        'Error in verification, check the number or code',
        400,
      );
    }

    const checkCode = await this.phoneVerifyProvider.checkCode(phone, code);

    if (checkCode.status !== 'approved') {
      throw new AppError(
        'Error in verification, check the number or code',
        400,
      );
    }

    const token = sign({}, 'cfe275a5908b5650488e0b0342c2d6cc', {
      subject: user.id,
      expiresIn: '1d',
    });

    const tokenReturn: IResponse = {
      user: {
        name: user.name,
        email: user.email,
      },
      token,
    };

    return tokenReturn;
  }
}

export { CheckSmsCodeUseCase };
