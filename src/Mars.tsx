import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const InstructionInput = styled.textarea`
  width: 50vw;
  height: 50vh;
  resize: none;
  margin-bottom: 20px;
`;

interface IProps {}

const Mars: React.FC<IProps> = () => {
  const [robotInstructions, setRobotInstructions] = useState<string>('');
  const [movementOutput, updateMovementOutput] = useState<string[]>([]);
    const lostRobotCoordinates: number[][] = [];

  const dothis = () => {
    const instructionSplit = robotInstructions.split('\n');
    const upperRightCoordinates = getCoordinates(instructionSplit[0]);
    const instructions = instructionSplit.slice(1, instructionSplit.length);
    instructions.forEach((instructionItem: string, index: number) => {
      if (index % 3 === 0) {
        updateMovementOutput([
          ...movementOutput,
          getMovement(
            instructionItem,
            instructions[index + 1],
            upperRightCoordinates
          ),
        ]);
      }
    });
  };

  const getMovement = (
    startPosition: string,
    movementString: string,
    upperRightCoordinates: number[]
  ): string => {
    let currentPositionCoordinates = getCoordinates(startPosition.slice(0, 3));
    let positionIncrement =
      directionIncrements[startPosition[startPosition.length - 1]];
    let positionIncrementIndex = Object.keys(directionIncrements).indexOf(
      startPosition[startPosition.length - 1]
    );
    for (const movementEntry of movementString.split('')) {
      if (movementEntry === 'L') {
        positionIncrementIndex =
          positionIncrementIndex === 0
            ? Object.keys(directionIncrements).length - 1
            : positionIncrementIndex - 1;
        positionIncrement =
          directionIncrements[
            Object.keys(directionIncrements)[positionIncrementIndex]
          ];
      }
      if (movementEntry === 'R') {
        positionIncrementIndex =
          positionIncrementIndex === Object.keys(directionIncrements).length - 1
            ? 0
            : positionIncrementIndex + 1;
        positionIncrement =
          directionIncrements[
            Object.keys(directionIncrements)[positionIncrementIndex]
          ];
      }
      if (movementEntry === 'F') {
        const nextPositionCoordinates = [
          currentPositionCoordinates[0] + positionIncrement[0],
          currentPositionCoordinates[1] + positionIncrement[1],
        ];
        if (
          nextPositionCoordinates[0] > upperRightCoordinates[0] ||
          nextPositionCoordinates[1] > upperRightCoordinates[1]
        ) {
          if (
            !lostRobotCoordinates.some(
              (lostRobotCoordinate: number[]) =>
                lostRobotCoordinate[0] === currentPositionCoordinates[0] &&
                lostRobotCoordinate[1] === currentPositionCoordinates[1]
            )
          ) {
            lostRobotCoordinates.push([
              currentPositionCoordinates[0],
              currentPositionCoordinates[1],
            ]);
            break;
          }
        } else {
          currentPositionCoordinates = nextPositionCoordinates;
        }
      }
    }
    console.log(
      currentPositionCoordinates,
      Object.keys(directionIncrements)[positionIncrementIndex]
    );
    return '';
  };

  const directionIncrements: { [key: string]: number[] } = {
    N: [0, 1],
    E: [1, 0],
    S: [0, -1],
    W: [-1, 0],
  };

  const getCoordinates = (coordinateString: string): number[] => {
    const coordinateStringArray = coordinateString.split(' ');
    return [
      parseInt(coordinateStringArray[0]),
      parseInt(coordinateStringArray[1]),
    ];
  };

  const onChangeRobotInstructions = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setRobotInstructions(e.target.value);
  };

  const onClickExecuteRobotInstructions = () => {
    dothis();
  };

  return (
    <Container>
      <InstructionInput
        onChange={onChangeRobotInstructions}
        value={robotInstructions}
      />
      <button
        disabled={!robotInstructions.length}
        onClick={onClickExecuteRobotInstructions}
      >
        Execute robot instructions
      </button>
      <div>{movementOutput}</div>
    </Container>
  );
};

export default Mars;
