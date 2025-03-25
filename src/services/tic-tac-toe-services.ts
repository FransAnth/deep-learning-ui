import AxiosInstance from "../helpers/axios-instance";

const { DeepLearning } = AxiosInstance();

export const triggerAiMove = async (boardState: any) => {
  const payload = {
    boardState: boardState,
  };
  const response = await DeepLearning.post("tic-tac-toe/", payload);

  return response.data;
};
