import {ActionReducer, Action} from '@ngrx/store';

export interface IUnverifiedToken {
  value: string;
  type: string;
  expires: number;
}

export interface IVerifiedToken extends IUnverifiedToken { }

export const TokenActions = {
  STORE: 'STORE_TOKEN',
  RESET: 'RESET_TOKEN'
}

export interface ITokenState {
  token: IVerifiedToken;
}

export const tokenReducer: ActionReducer<IVerifiedToken> = (state: IVerifiedToken = null, action: Action): IVerifiedToken => {
  switch(action.type) {
    case TokenActions.RESET:
      return null;

    case TokenActions.STORE:
      return <IVerifiedToken>action.payload;

    default:
      return state;
  };
};