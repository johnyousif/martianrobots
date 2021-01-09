const express = require('express');
const cors = require('cors');

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/outputMovements', function (req, res) {
  const directionIncrements = {
    N: [0, 1],
    E: [1, 0],
    S: [0, -1],
    W: [-1, 0],
  };

  const getCoordinates = (coordinateString) => {
    const coordinateStringArray = coordinateString.split(' ');
    return [
      parseInt(coordinateStringArray[0]),
      parseInt(coordinateStringArray[1]),
    ];
  };

  const executeInstructions = (
    startPosition,
    movementString,
    upperRightCoordinates
  ) => {
    // Initialisations and validations
    if (
      [...movementString].some(
        (entry) => entry !== 'R' && entry !== 'L' && entry !== 'F'
      )
    ) {
      res
        .status(400)
        .send('Movement instructions must only consist of R, L or F');
      return;
    }

    if (movementString.length > 100) {
      res.status(400).send('Movement instructions must be < 100 characters');
      return;
    }

    if (
      upperRightCoordinates[0] > 50 ||
      upperRightCoordinates[1] > 50 ||
      upperRightCoordinates[0] < 0 ||
      upperRightCoordinates[1] < 0
    ) {
      res
        .status(400)
        .send('Upper right coordinates must be < [50,50] and positive numbers');
      return;
    }

    let currentPositionCoordinates = getCoordinates(
      startPosition.slice(0, startPosition.length)
    );

    if (
      currentPositionCoordinates[0] > 50 ||
      currentPositionCoordinates[1] > 50 ||
      currentPositionCoordinates[0] < 0 ||
      currentPositionCoordinates[1] < 0
    ) {
      res
        .status(400)
        .send(
          'Start position coordinates must be < [50,50] and positive numbers'
        );
      return;
    }

    if (
      isNaN(currentPositionCoordinates[0]) ||
      isNaN(currentPositionCoordinates[1])
    ) {
      res.status(400).send('Check input coordinates are valid');
      return;
    }

    let positionIncrement =
      directionIncrements[startPosition[startPosition.length - 1]];
    let positionIncrementIndex = Object.keys(directionIncrements).indexOf(
      startPosition[startPosition.length - 1]
    );
    let isLost = false;

    for (const movementEntry of movementString.split('')) {
      if (movementEntry === 'L') {
        // Determine new direction
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
        // Determine new direction
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

        // Check if the next position out of bounds
        if (
          nextPositionCoordinates[0] > upperRightCoordinates[0] ||
          nextPositionCoordinates[1] > upperRightCoordinates[1] ||
          nextPositionCoordinates[0] < 0 ||
          nextPositionCoordinates[1] < 0
        ) {
          // If so, check if a robot was lost here before
          if (
            !lostRobotCoordinates.some(
              (lostRobotCoordinate) =>
                lostRobotCoordinate[0] === currentPositionCoordinates[0] &&
                lostRobotCoordinate[1] === currentPositionCoordinates[1]
            )
          ) {
            // If not, add the new "lost" coordinate
            lostRobotCoordinates.push([
              currentPositionCoordinates[0],
              currentPositionCoordinates[1],
            ]);
            isLost = true;
            break;
          }
        } else {
          // Otherwise continue robot movement
          currentPositionCoordinates = nextPositionCoordinates;
        }
      }
    }

    // Add robot output to response
    outputMovements.push(
      `${currentPositionCoordinates.join(' ')} ${
        Object.keys(directionIncrements)[positionIncrementIndex]
      } ${isLost ? 'LOST' : ''}`
    );
  };

  const outputMovements = [];

  const lostRobotCoordinates = [];

  const instructionSplit = req.query.input.split('\n');
  const upperRightCoordinates = getCoordinates(instructionSplit[0]);
  const instructions = instructionSplit.slice(1, instructionSplit.length);
  try {
    instructions.forEach((instructionItem, index) => {
      if (index % 3 === 0) {
        executeInstructions(
          instructionItem,
          instructions[index + 1],
          upperRightCoordinates
        );
      }
    });
  } catch (error) {
    res.status(400).send('Input contains a structural error');
    return;
  }

  res.send(outputMovements.join('\n\n'));
});

app.listen(port);
