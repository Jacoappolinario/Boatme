import { Twilio } from 'twilio';

import { ITwoFactorProvider } from '../ITwoFactorProvider';

const accounSid = 'AC289e655eb14ffc5f1eb39dff35c94ad7';
const authToken = '3e8bdcec7e120abef7017bb9f9944793';
const serviceId = 'VA8abbe5104b34b4df16ed72e5f1ac125d';

const client = new Twilio(accounSid, authToken);

class TwilioTwoFactorProvider implements ITwoFactorProvider {
  async sendSmsCode(phone?: string): Promise<any> {
    return client.verify
      .services(serviceId)
      .verifications.create({ to: `+55${phone}`, channel: 'sms' })
      .then(verification => console.log(verification.status));
  }

  checkCode(phone: string, code: string): Promise<any> {
    return client.verify
      .services(serviceId)
      .verificationChecks.create({ to: phone, code })
      .then(verification_check => console.log(verification_check.status));
  }
}

export { TwilioTwoFactorProvider };
