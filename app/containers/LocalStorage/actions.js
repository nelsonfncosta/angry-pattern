import { INIT, LAST_PATTERN_SET } from './constants';

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
