

import { Action } from '@ngrx/store';

export const SET_Authenticated = '[auth] Set Authenticated';
export const SET_UNAuthenticated = '[auth] Set UnAuthenticated';

export class SetAuthenticated implements Action {
  readonly type = SET_Authenticated;
}

export class SetUnAuthenticated implements Action {
  readonly type = SET_UNAuthenticated;
}

export type AuthActions = (SetAuthenticated | SetUnAuthenticated);
