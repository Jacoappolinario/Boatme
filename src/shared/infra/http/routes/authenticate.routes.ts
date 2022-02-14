import { Router } from 'express';

import { AuthenticateUserController } from '@modules/accounts/useCases/authenticateUser/AuthenticateUserController';
import { SendSmsCodeController } from '@modules/accounts/useCases/sendSmsCode/SendSmsCodeController';

const authenticateRoutes = Router();

const authenticateUserController = new AuthenticateUserController();
const sendSmsCodeController = new SendSmsCodeController();

authenticateRoutes.post('/sessions', authenticateUserController.handle);
authenticateRoutes.post('/send-sms-code', sendSmsCodeController.handle);

export { authenticateRoutes };
