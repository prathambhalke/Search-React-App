import { GET_DATA } from "../constants";

export const get_data = (data) => {
  return {
    type: GET_DATA,
    payload: data,
  };
};
