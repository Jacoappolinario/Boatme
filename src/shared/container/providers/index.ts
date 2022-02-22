import { container } from 'tsyringe';

import { IDateProvider } from './DateProvider/IDateProvider';
import { DayjsDateProvider } from './DateProvider/implementations/DayjsDateProvider';
import { TwilioVerifyProvider } from './PhoneVerifyProvider/implementations/TwilioVerifyProvider';
import { IPhoneVerifyProvider } from './PhoneVerifyProvider/IPhoneVerifyProvider';

container.registerSingleton<IPhoneVerifyProvider>(
  'TwilioVerifyProvider',
  TwilioVerifyProvider,
);

container.registerSingleton<IDateProvider>(
  'DayjsDateProvider',
  DayjsDateProvider,
);
