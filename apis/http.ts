import Config from "@/constants/Config";
import axios from "axios";

const http = axios.create({
    baseURL: Config.Env.BASE_URL,
    timeout: 20000,
});
export default http