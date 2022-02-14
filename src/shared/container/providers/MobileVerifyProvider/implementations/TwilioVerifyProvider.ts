import { Twilio } from 'twilio';
import { VerificationInstance } from 'twilio/lib/rest/verify/v2/service/verification';
import { VerificationCheckInstance } from 'twilio/lib/rest/verify/v2/service/verificationCheck';

import { IMobileVerifyProvider } from '../IMobileVerifyProvider';

const accounSid = 'AC289e655eb14ffc5f1eb39dff35c94ad7';
const authToken = '1c85b2cdda9c2bfa546670a34361ade4';
const serviceId = 'VA8abbe5104b34b4df16ed72e5f1ac125d';

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
