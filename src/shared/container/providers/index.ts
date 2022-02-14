import { container } from 'tsyringe';

import { TwilioTwoFactorProvider } from './TwoFactorProvider/implementations/TwilioTwoFactorProvider';
import { ITwoFactorProvider } from './TwoFactorProvider/ITwoFactorProvider';

container.registerSingleton<ITwoFactorProvider>(
  'TwilioTwoFactorProvider',
  TwilioTwoFactorProvider,
);
