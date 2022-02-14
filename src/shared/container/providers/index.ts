import { container } from 'tsyringe';

import { IMobileVerifyProvider } from './MobileVerifyProvider/IMobileVerifyProvider';
import { TwilioVerifyProvider } from './MobileVerifyProvider/implementations/TwilioVerifyProvider';

container.registerSingleton<IMobileVerifyProvider>(
  'TwilioVerifyProvider',
  TwilioVerifyProvider,
);
