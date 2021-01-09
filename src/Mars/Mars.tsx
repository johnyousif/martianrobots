import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import {
  Container,
  InstructionInput,
  Output,
  OutputError,
} from './Mars.styles';
import { createGetOutputMovementsRequestedAction } from '../redux/actionCreators';
import { RootState } from '../redux/root';
import {
  getOutputMovements,
  getOutputMovementsError,
} from '../redux/selectors/movement';

interface IStateProps {
  outputMovements: string;
  outputMovementsError?: string;
}

interface IDispatchProps {
  getOutputMovements: (inputMovements: string) => void;
}

export const Mars: React.FC<IStateProps & IDispatchProps> = ({
  outputMovements,
  outputMovementsError,
  getOutputMovements,
}) => {
  const [robotInstructions, setRobotInstructions] = useState<string>('');

  const onChangeRobotInstructions = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setRobotInstructions(e.target.value);
  };

  const onClickExecuteRobotInstructions = () => {
    getOutputMovements(encodeURI(robotInstructions));
  };
  
  return (
    <Container>
      <InstructionInput
        className="instruction-input"
        placeholder="Enter input instructions here..."
        onChange={onChangeRobotInstructions}
        value={robotInstructions}
      />
      <button
        disabled={!robotInstructions.length}
        onClick={onClickExecuteRobotInstructions}
      >
        Execute robot instructions
      </button>
      <Output>{outputMovements}</Output>
      {outputMovementsError && (
        <OutputError className="output-error">
          {outputMovementsError}
        </OutputError>
      )}
    </Container>
  );
};

const mapStateToProps = (state: RootState): IStateProps => ({
  outputMovements: getOutputMovements(state),
  outputMovementsError: getOutputMovementsError(state),
});

const mapDispatchToProps = (dispatch: Dispatch): IDispatchProps => ({
  getOutputMovements: (inputMovements: string) =>
    dispatch(createGetOutputMovementsRequestedAction(inputMovements)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Mars);
