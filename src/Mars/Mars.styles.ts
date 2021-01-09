import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const InstructionInput = styled.textarea`
  width: 50vw;
  height: 25vh;
  resize: none;
  margin-bottom: 20px;
  padding: 10px;
`;

export const Output = styled.div`
  width: 50vw;
  height: 25vh;
  margin-top: 20px;
  padding: 10px;
  background: #000000;
  color: #ffffff;
  white-space: pre-wrap;
`;

export const OutputError = styled.p`
  font-size: 20px;
  font-weight: bold;
  margin-top: 20px;
  color: red;
`;
