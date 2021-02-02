import produce from 'immer';
import { INIT, LAST_PATTERN_SET, SAVE_LAST_PATTERN } from './constants';

export const initialState = {
  patternHistory: [],
  lastPattern: [],
};

/* eslint-disable , no-param-reassign */
const localStorageReducer = (state = initialState, { type, payload }) =>
  produce(state, draft => {
    switch (type) {
      case INIT:
        return { ...state, patternHistory: payload.data };
      case LAST_PATTERN_SET:
        return { ...state, lastPattern: payload.data };
      case SAVE_LAST_PATTERN:
        return {
          ...state,
          patternHistory: [...state.patternHistory, state.lastPattern],
        };
      default:
        return state;
    }
  });

export const getLocalStorage = state => state.localStorage;
export const getPatternHistory = state => getLocalStorage(state).patternHistory;

export default localStorageReducer;
