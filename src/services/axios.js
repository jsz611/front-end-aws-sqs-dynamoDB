import axios from "axios";

const instance = axios.create({
  baseURL: "https://desafio-aws-sand.vercel.app/api/",
});

export default instance;
