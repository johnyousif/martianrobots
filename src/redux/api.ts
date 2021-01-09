import axios from 'axios';

const baseUrl = 'http://localhost:3001';

export const getOutputMovements = (inputMovements: string) =>
  axios
    .get(`${baseUrl}/outputMovements?input=${inputMovements}`)
    .catch((error: any) => ({ error: error.response.data }));
