export interface IUnverifiedToken {
  value: string;
  type: string;
  expires: number;
}

export interface IVerifiedToken extends IUnverifiedToken { }