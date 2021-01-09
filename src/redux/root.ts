import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';
import { movement } from './reducers/movement';
import { watchGetOutputMovements } from './sagas/movement';

export function* rootSaga() {
  yield all(watchGetOutputMovements);
}

export const rootReducer = combineReducers({
  movement,
});

export type MovementState = {
  outputMovements: string;
  error?: string;
};

export type RootState = {
  movement: MovementState;
};
