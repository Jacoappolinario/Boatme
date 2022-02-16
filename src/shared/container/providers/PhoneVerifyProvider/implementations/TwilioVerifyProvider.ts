import { Twilio } from 'twilio';
import { VerificationInstance } from 'twilio/lib/rest/verify/v2/service/verification';
import { VerificationCheckInstance } from 'twilio/lib/rest/verify/v2/service/verificationCheck';

import phoneVerify from '@config/phoneVerify';

import { IPhoneVerifyProvider } from '../IPhoneVerifyProvider';

const client = new Twilio(phoneVerify.accounSid, phoneVerify.authToken);

class TwilioVerifyProvider implements IPhoneVerifyProvider {
  sendSmsCode(phone: string): Promise<VerificationInstance> {
    const status = client.verify
      .services(phoneVerify.serviceId)
      .verifications.create({ to: `+55${phone}`, channel: 'sms' })
      .then(verification => verification);

    return status;
  }

  checkCode(phone: string, code: string): Promise<VerificationCheckInstance> {
    const status = client.verify
      .services(phoneVerify.serviceId)
      .verificationChecks.create({ to: `+55${phone}`, code })
      .then(verification_check => verification_check);

    return status;
  }
}

export { TwilioVerifyProvider };
