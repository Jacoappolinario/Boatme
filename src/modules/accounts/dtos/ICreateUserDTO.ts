interface ICreateUserDTO {
  name: string;
  password: string;
  email: string;
  phone: string;
  driver_license?: string;
  id?: string;
  avatar?: string;
}

export { ICreateUserDTO };
