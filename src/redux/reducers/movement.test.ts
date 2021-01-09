import { actionTypes } from '../actionTypes';
import { movement } from './movement';

describe('movement reducer tests', () => {
  it('should return initial state by default', () => {
    expect(
      movement(undefined, {
        type: '',
      })
    ).toEqual({ outputMovements: '' });
  });

  it('should return output movements on successful completion of request', () => {
    const outputMovements = '1 1 N';
    expect(
      movement(undefined, {
        outputMovements,
        type: actionTypes.GET_OUTPUT_MOVEMENTS_COMPLETED,
      })
    ).toEqual({ outputMovements });
  });

  it('should return error on request failure', () => {
    const error = 'error';
    expect(
      movement(undefined, {
        error,
        type: actionTypes.GET_OUTPUT_MOVEMENTS_FAILED,
      })
    ).toEqual({ error, outputMovements: '' });
  });
});
