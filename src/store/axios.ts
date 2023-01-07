import axios from "axios";
const baseURL = "http://localhost:6060";

const instanse = axios.create({ baseURL });

export default instanse;
