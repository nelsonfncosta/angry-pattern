import { select } from 'redux-saga/effects';
import { MAIN_KEY } from './constants';
import { getPatternHistory } from './reducer';

export default function* handleSaveSaga(action) {
  const patterns = yield select(getPatternHistory);

  window.localStorage.setItem(MAIN_KEY, JSON.stringify(patterns));
}
