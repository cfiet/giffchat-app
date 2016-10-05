import {ITokenState} from '../token';
import {ICurrentUserState} from '../user';

export * from '../token';
export * from '../user';

export interface IAppState extends ITokenState, ICurrentUserState {}