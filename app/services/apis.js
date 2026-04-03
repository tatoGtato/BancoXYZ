import axios from "axios";

//Gets the users balance 
export const getBalance = async () => {
  const res = await axios.get(
    "https://2k0ic4z7s5.execute-api.us-east-1.amazonaws.com/default/balance",
  );
  return res.data;
};

//Gets the users transferr history
export const getTransactions = async () => {
  const res = await axios.get(
    "https://n0qaa2fx3c.execute-api.us-east-1.amazonaws.com/default/transferList",
  );
  return res.data;
};

//Makes the request to trsnfer money to another user
export const doTransaction = async (body) => {
  const res = await axios.post(
    "https://ofqx4zxgcf.execute-api.us-east-1.amazonaws.com/default/transfer",
    body,
  );
  return res.data;
};
