interface IMobileVerifyProvider {
  sendSmsCode(phone: string);
  checkCode(phone: string, code: string);
}

export { IMobileVerifyProvider };
