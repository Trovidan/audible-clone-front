import axios from 'axios';


const instance = axios.create({
  baseURL: 'https://audible-clone-back.herokuapp.com/'
});

export default instance;
