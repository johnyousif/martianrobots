import { AnyAction } from 'redux';
import { actionTypes } from '../actionTypes';
import {
  GetOutputMovementsCompletedAction,
  GetOutputMovementsFailedAction,
} from '../actionCreators';
import { MovementState } from '../root';

const initialState: MovementState = { outputMovements: '', error: undefined };

export const movement = (
  state: MovementState = initialState,
  action: AnyAction
): MovementState => {
  switch (action.type) {
    case actionTypes.GET_OUTPUT_MOVEMENTS_COMPLETED:
      const getOutputMovementsCompletedAction = action as GetOutputMovementsCompletedAction;
      return {
        ...state,
        outputMovements: getOutputMovementsCompletedAction.outputMovements,
        error: undefined,
      };

    case actionTypes.GET_OUTPUT_MOVEMENTS_FAILED:
      const getOutputMovementsFailedAction = action as GetOutputMovementsFailedAction;
      return {
        ...state,
        error: getOutputMovementsFailedAction.error,
      };

    default:
      return state;
  }
};
