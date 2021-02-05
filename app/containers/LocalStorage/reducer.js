import produce from 'immer';
import { isEqual } from 'lodash';
import { createSelector } from 'reselect';
import { INIT, LAST_PATTERN_SET, SAVE_LAST_PATTERN } from './constants';

export const initialState = {
  patternHistory: [],
  lastPattern: [],
};

/* eslint-disable , no-param-reassign */
const localStorageReducer = (state = initialState, { type, payload }) =>
  produce(state, () => {
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
export const getLastPattern = state => getLocalStorage(state).lastPattern;

export const patternAlreadyExists = createSelector(
  getPatternHistory,
  getLastPattern,
  (patternHistory, lastPattern) =>
    patternHistory.some(p => isEqual(p, lastPattern)),
);

export const patternExists = createSelector(
  getPatternHistory,
  patternHistory => pattern => patternHistory.some(p => isEqual(p, pattern)),
);

export default localStorageReducer;
