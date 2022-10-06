import { Action } from '@ngrx/store';

import {  SET_Authenticated, SET_UNAuthenticated } from './auth.actions';

export interface State {
  isAuthenticated: boolean;
}

const initialState: State = {
    isAuthenticated: false
};

export function authReducer(state = initialState, action: Action) 
{
  switch (action.type) {
    case SET_Authenticated:
      return {
        isAuthenticated: true
      };
    case SET_UNAuthenticated:
      return {
        isAuthenticated: false
      };
    default: {
      return state;
    }
  }
}

export const getIsAuthenticated = (state: State) => state.isAuthenticated;
