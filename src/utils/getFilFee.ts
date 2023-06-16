import axios from "axios";

export const fetchFilFee = async () => {
  try {
    const res = await axios.get("/en");
    console.log(res);
  } catch (error) {
    console.log(error);
    return [];
  }
};
