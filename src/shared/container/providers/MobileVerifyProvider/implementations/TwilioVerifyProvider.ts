import { Twilio } from 'twilio';
import { VerificationInstance } from 'twilio/lib/rest/verify/v2/service/verification';
import { VerificationCheckInstance } from 'twilio/lib/rest/verify/v2/service/verificationCheck';

import { IMobileVerifyProvider } from '../IMobileVerifyProvider';

const accounSid = '';
const authToken = '';
const serviceId = '';

class TwilioVerifyProvider implements IMobileVerifyProvider {
  private client: Twilio;

  constructor() {
    this.client = new Twilio(accounSid, authToken);
  }

  sendSmsCode(phone: string): Promise<VerificationInstance> {
    const status = this.client.verify
      .services(serviceId)
      .verifications.create({ to: `+55${phone}`, channel: 'sms' })
      .then(verification => verification);

    return status;
  }

  checkCode(phone: string, code: string): Promise<VerificationCheckInstance> {
    const status = this.client.verify
      .services(serviceId)
      .verificationChecks.create({ to: `+55${phone}`, code })
      .then(verification_check => verification_check);

    return status;
  }
}

export { TwilioVerifyProvider };
