# Martian Robots

This project consists of a UI that takes user input and a backend that performs movement calculations.

## Instructions

The UI consists of two boxes and an execution button. The top box is used to enter movement instructions and once the execution button is hit, the bottom box will display final robot positions. Each pair of robot instruction lines must be separated by a 1 line space (excluding the upper right boundary) otherwise a validation error will occur. Should other input errors occur e.g. instructions other than R, L or F or coordinates outside the allowed boundaries etc, then validation errors will appear beneath the bottom box. An example of correct input is:

```
6 9
1 2 N
RFLRF

2 3 S
LLRRFF
```

### `npm install`

To install the dependencies.

### `npm run api`

Starts the api on [http://localhost:3001](http://localhost:3001).

### `npm start`

Runs the app on [http://localhost:3000](http://localhost:3000).

### `npm test`

To run the unit tests.
