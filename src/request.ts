import axios from "axios";

const Axios = axios.create({
  baseURL: "https://swapi.py4e.com/api",
});

export const GetData = (url: string, data?: Record<string, unknown>) => {
  const inputData = data || {};

  return Axios.get(url, {
    params: inputData,
  });
};
