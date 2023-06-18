import lighthouse from "@lighthouse-web3/sdk";

export const generateCAR = async (path) => {
  const apiKey = import.meta.env.VITE_LH_API_KEY;

  // Get an auth token for the data depot service
  // Note: you can use this token multiple times it expires in 20 days
  const authToken = await lighthouse.dataDepotAuth(apiKey);
  // Create CAR
  const response = await lighthouse.createCar(
    path,
    authToken.data.access_token
  );

  const files = lighthouse.viewCarFiles(1, import.meta.env.VITE_LH_API_KEY);

  console.log(response);
  console.log(files);
  /*
    { data: 'Uploaded the files successfully' }
  */
};
