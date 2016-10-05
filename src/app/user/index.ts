import {ActionReducer, Action} from '@ngrx/store';

export interface ICurrentUser {
}

export const CurrentUserActions = {
  UPDATE: 'UPDATE_CURRENT_USER',
  RESET: 'RESET_CURRENT_USER'
};

export interface ICurrentUserState {
  currentUser: ICurrentUser;
}

export const currentUserReducer: ActionReducer<ICurrentUser> = (state: ICurrentUser, action: Action): ICurrentUser => {
  switch(action.type)
  {
    case CurrentUserActions.RESET:
      return null;

    case CurrentUserActions.UPDATE:
      return <ICurrentUser> action.payload;

    default:
      return state;
  }
}