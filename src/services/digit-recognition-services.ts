import AxiosInstance from "../helpers/axios-instance";

const { DeepLearning } = AxiosInstance();

export const addDataset = async (dataset: any[]) => {
  const response = await DeepLearning.post("digit-recognition/", dataset);

  return response.data;
};

export const getDatasetDbInfo = async () => {
  const response = await DeepLearning.get("digit-recognition/dataset-info/");

  return response;
};
