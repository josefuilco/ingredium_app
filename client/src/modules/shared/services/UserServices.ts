import axios from "axios";

export const getUser = async () => {
  const { data: response } = await axios.get(`http://localhost:3000/api/users`, {
    headers: {
      Authorization: localStorage.getItem("accessKey")?.replace(/"/g, ''),
    },
  });
  return response.data;
};