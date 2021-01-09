import { actionTypes } from './actionTypes';
import { AnyAction } from 'redux';

export interface GetOutputMovementsRequestedAction extends AnyAction {
  inputMovements: string;
}

export const createGetOutputMovementsRequestedAction = (
  inputMovements: string
): GetOutputMovementsRequestedAction => ({
  inputMovements,
  type: actionTypes.GET_OUTPUT_MOVEMENTS_REQUESTED,
});

export interface GetOutputMovementsCompletedAction extends AnyAction {
  outputMovements: string;
}

export const createGetOutputMovementsCompletedAction = (
  outputMovements: string
): GetOutputMovementsCompletedAction => ({
  outputMovements,
  type: actionTypes.GET_OUTPUT_MOVEMENTS_COMPLETED,
});

export interface GetOutputMovementsFailedAction extends AnyAction {
  error: string;
}

export const createGetOutputMovementsFailedAction = (
  error: string
): GetOutputMovementsFailedAction => ({
  error,
  type: actionTypes.GET_OUTPUT_MOVEMENTS_FAILED,
});
