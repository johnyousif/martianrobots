import { RootState } from '../root';

export const getOutputMovements = (state: RootState) =>
  state.movement.outputMovements;

export const getOutputMovementsError = (state: RootState) =>
  state.movement.error;
