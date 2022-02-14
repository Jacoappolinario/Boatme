import { inject, injectable } from 'tsyringe';

import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { IMobileVerifyProvider } from '@shared/container/providers/MobileVerifyProvider/IMobileVerifyProvider';

@injectable()
class SendSmsCodeUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('TwilioVerifyProvider')
    private mobileVerifyProvider: IMobileVerifyProvider,
  ) {}

  async execute(phone: string): Promise<any> {
    const user = await this.usersRepository.findByPhone(phone);

    if (!user) {
      throw new Error('Phone number incorrect! ');
    }

    const status = await this.mobileVerifyProvider.sendSmsCode(phone);

    return status;
  }
}

export { SendSmsCodeUseCase };
