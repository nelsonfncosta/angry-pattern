import { INIT, LAST_PATTERN_SET, SAVE_LAST_PATTERN } from './constants';

export function init(data) {
  return {
    type: INIT,
    payload: { data },
  };
}

export function lastPatternSet(data) {
  return {
    type: LAST_PATTERN_SET,
    payload: { data },
  };
}

export function saveLastPattern() {
  return {
    type: SAVE_LAST_PATTERN,
  };
}
