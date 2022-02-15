import { inject, injectable } from 'tsyringe';
import { VerificationInstance } from 'twilio/lib/rest/verify/v2/service/verification';

import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { IMobileVerifyProvider } from '@shared/container/providers/MobileVerifyProvider/IMobileVerifyProvider';
import { AppError } from '@shared/errors/AppError';

@injectable()
class SendSmsCodeUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('TwilioVerifyProvider')
    private mobileVerifyProvider: IMobileVerifyProvider,
  ) {}

  async execute(phone: string): Promise<VerificationInstance> {
    const user = await this.usersRepository.findByPhone(phone);

    if (!user) {
      throw new AppError('Phone number incorrect!', 400);
    }

    const status = await this.mobileVerifyProvider.sendSmsCode(phone);

    return status;
  }
}

export { SendSmsCodeUseCase };
