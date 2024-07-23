import axios from "axios";

const Instance = axios.create({
  baseURL: "https://relience-server.azurewebsites.net/api/",
});

export default Instance;
