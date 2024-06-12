import { combineReducers } from 'redux';

import {
    GlobalReducer,
    Login,
    GeneralConfigurationReducer,
  } from "@/store/reducers/reducers";


export const createReducer = combineReducers({
    GlobalReducer,
    login: Login,
    GeneralConfigurationReducer,
})
  