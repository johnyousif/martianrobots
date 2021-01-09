import { call, put } from 'redux-saga/effects';
import { actionTypes } from '../actionTypes';
import { getOutputMovements } from '../api';
import { getOutputMovementsSaga } from './movement';

describe('movement reducer tests', () => {
  it('should return output on success', () => {
    const inputMovements = 'xyz';

    const gen = getOutputMovementsSaga({
      inputMovements,
      type: actionTypes.GET_OUTPUT_MOVEMENTS_REQUESTED,
    });
    expect(gen.next().value).toEqual(call(getOutputMovements, inputMovements));
    expect(gen.next({ data: 'abc', error: undefined }).value).toEqual(
      put({
        type: actionTypes.GET_OUTPUT_MOVEMENTS_COMPLETED,
        outputMovements: 'abc',
      })
    );
  });

  it('should return error on failure', () => {
    const inputMovements = 'xyz';
    const error = 'error';

    const gen = getOutputMovementsSaga({
      inputMovements,
      type: actionTypes.GET_OUTPUT_MOVEMENTS_REQUESTED,
    });
    expect(gen.next().value).toEqual(call(getOutputMovements, inputMovements));
    expect(gen.next({ data: undefined, error }).value).toEqual(
      put({
        error,
        type: actionTypes.GET_OUTPUT_MOVEMENTS_FAILED,
      })
    );
  });
});
