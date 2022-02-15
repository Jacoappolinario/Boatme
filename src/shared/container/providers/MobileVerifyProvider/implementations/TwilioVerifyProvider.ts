import { Twilio } from 'twilio';
import { VerificationInstance } from 'twilio/lib/rest/verify/v2/service/verification';
import { VerificationCheckInstance } from 'twilio/lib/rest/verify/v2/service/verificationCheck';

import mobileVerify from '@config/mobileVerify';

import { IMobileVerifyProvider } from '../IMobileVerifyProvider';

const client = new Twilio(mobileVerify.accounSid, mobileVerify.authToken);

class TwilioVerifyProvider implements IMobileVerifyProvider {
  sendSmsCode(phone: string): Promise<VerificationInstance> {
    const status = client.verify
      .services(mobileVerify.serviceId)
      .verifications.create({ to: `+55${phone}`, channel: 'sms' })
      .then(verification => verification);

    return status;
  }

  checkCode(phone: string, code: string): Promise<VerificationCheckInstance> {
    const status = client.verify
      .services(mobileVerify.serviceId)
      .verificationChecks.create({ to: `+55${phone}`, code })
      .then(verification_check => verification_check);

    return status;
  }
}

export { TwilioVerifyProvider };
