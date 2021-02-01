import produce from 'immer';
import { INIT, LAST_PATTERN_SET } from './constants';

export const initialState = {
  patternHistory: [],
  lastPattern: [],
};

/* eslint-disable , no-param-reassign */
const localStorageReducer = (state = initialState, { type, payload }) =>
  produce(state, draft => {
    switch (type) {
      case INIT:
        draft = { ...state, patternHistory: payload.data };
        return draft;
      case LAST_PATTERN_SET:
        draft = { ...state, lastPattern: payload.data };
        return draft;
      default:
        return state;
    }
  });

export const getpatternHistory = state => state.localStorage.patternHistory;

export default localStorageReducer;
