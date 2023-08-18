import axios from "axios";

const BASEURL="https://book-e-sell-node-api.vercel.app/api/book/all";


class BookService{
    GetAllBooks = async(payload) => {
      return axios.get(`${BASEURL}`,payload);
    };
   
   
}
export default new BookService();