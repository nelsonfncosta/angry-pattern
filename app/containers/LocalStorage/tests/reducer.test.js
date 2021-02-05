import { patternAlreadyExists } from '../reducer';

describe('localStorageReducer', () => {});

describe('selectors', () => {
  const state = {
    localStorage: {
      patternHistory: [[1, 2, 3], [4, 5, 6], [7, 8, 9]],
      lastPattern: [4, 5, 6],
    },
  };

  describe('patternAlreadyExists', () => {
    it('checks if the last pattern already exists', () => {
      expect(patternAlreadyExists(state)).toEqual(true);
    });
  });
});
