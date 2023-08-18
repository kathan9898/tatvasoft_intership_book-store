import axios from "axios";

const BASEURL="https://book-e-sell-node-api.vercel.app/api/user";
const BASEURL1="https://book-e-sell-node-api.vercel.app/api/user/login";

class AuthService{
    Register = async(payload) => {
      return axios.post(`${BASEURL}`,payload);
    };

    Login = async(payload) => {
      return axios.post(`${BASEURL1}`,payload);
    };
}
export default new AuthService();