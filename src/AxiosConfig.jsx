import axios from "axios";

const Instance = axios.create({
  baseURL: "https://bilkins-cms.onrender.com/",
});

export default Instance;
