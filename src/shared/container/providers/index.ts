import { container } from 'tsyringe';

import { TwilioVerifyProvider } from './PhoneVerifyProvider/implementations/TwilioVerifyProvider';
import { IPhoneVerifyProvider } from './PhoneVerifyProvider/IPhoneVerifyProvider';

container.registerSingleton<IPhoneVerifyProvider>(
  'TwilioVerifyProvider',
  TwilioVerifyProvider,
);
