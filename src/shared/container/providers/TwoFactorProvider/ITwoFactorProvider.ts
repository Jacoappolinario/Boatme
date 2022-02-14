interface ITwoFactorProvider {
  sendSmsCode(phone: string): Promise<string>;
  checkCode(phone: string, code: string): Promise<string>;
}

export { ITwoFactorProvider };
