import axios from "axios";
import { baseUrl } from "./_config";

export const httpRegisterUser = (payload) => axios.post(baseUrl + 'Authentication/register', payload)
export const httpLogin = (payload) => axios.post(baseUrl + 'Authentication/login', payload)