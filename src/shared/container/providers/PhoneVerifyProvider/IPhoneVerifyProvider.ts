interface IPhoneVerifyProvider {
  sendSmsCode(phone: string);
  checkCode(phone: string, code: string);
}

export { IPhoneVerifyProvider };
