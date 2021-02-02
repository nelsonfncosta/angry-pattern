import { takeLatest, call, put, select, all } from 'redux-saga/effects';
import { SAVE_LAST_PATTERN } from './containers/LocalStorage/constants';
import handleSaveSaga from './containers/LocalStorage/save-saga';

// Root saga
export default function* rootSaga() {
  // if necessary, start multiple sagas at once with `all`
  yield all([takeLatest(SAVE_LAST_PATTERN, handleSaveSaga)]);
}
