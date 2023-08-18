
import axios from "axios";

const BASEURL = "https://book-e-sell-node-api.vercel.app/api/book";


class AddBook {
  AddBook = async (payload) => {
    return axios.post(`${BASEURL}`, payload);
  };
}


export default new AddBook();