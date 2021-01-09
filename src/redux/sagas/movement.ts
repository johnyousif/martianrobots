import { call, put, takeEvery } from 'redux-saga/effects';
import { actionTypes } from '../actionTypes';
import { getOutputMovements } from '../api';

export function* getOutputMovementsSaga(action: {
  type: string;
  inputMovements: string;
}) {
  const { data, error } = yield call(getOutputMovements, action.inputMovements);

  if (data) {
    yield put({
      type: actionTypes.GET_OUTPUT_MOVEMENTS_COMPLETED,
      outputMovements: data,
    });
  } else {
    yield put({ type: actionTypes.GET_OUTPUT_MOVEMENTS_FAILED, error });
  }
}

export const watchGetOutputMovements = [
  takeEvery(actionTypes.GET_OUTPUT_MOVEMENTS_REQUESTED, getOutputMovementsSaga),
];
