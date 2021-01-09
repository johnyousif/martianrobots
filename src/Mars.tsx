import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import styled from 'styled-components';
import { createGetOutputMovementsRequestedAction } from './redux/actionCreators';
import { RootState } from './redux/root';
import {
  getOutputMovements,
  getOutputMovementsError,
} from './redux/selectors/movement';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const InstructionInput = styled.textarea`
  width: 50vw;
  height: 25vh;
  resize: none;
  margin-bottom: 20px;
  padding: 10px;
`;

const Output = styled.div`
  width: 50vw;
  height: 25vh;
  margin-top: 20px;
  padding: 10px;
  background: #000000;
  color: #ffffff;
  white-space: pre-wrap;
`;

const Error = styled.p`
  font-size: 20px;
  font-weight: bold;
  margin-top: 20px;
  color: red;
`;

interface IStateProps {
  outputMovements: string;
  outputMovementsError?: string;
}

interface IDispatchProps {
  getOutputMovements: (inputMovements: string) => void;
}

const Mars: React.FC<IStateProps & IDispatchProps> = ({
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
      <Output>{outputMovements || 'Output will appear here...'}</Output>
      {outputMovementsError && <Error>{outputMovementsError}</Error>}
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
