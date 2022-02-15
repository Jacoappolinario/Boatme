import { Router } from 'express';

import { AuthenticateUserController } from '@modules/accounts/useCases/authenticateUser/AuthenticateUserController';
import { CkeckSmsController } from '@modules/accounts/useCases/checkSmsCode/CheckSmsCodeController';
import { SendSmsCodeController } from '@modules/accounts/useCases/sendSmsCode/SendSmsCodeController';

const authenticateRoutes = Router();

const authenticateUserController = new AuthenticateUserController();
const sendSmsCodeController = new SendSmsCodeController();
const checkSmsCodeController = new CkeckSmsController();

authenticateRoutes.post('/sessions', authenticateUserController.handle);
authenticateRoutes.post('/send-sms-code', sendSmsCodeController.handle);
authenticateRoutes.post('/check-sms-code', checkSmsCodeController.handle);

export { authenticateRoutes };
