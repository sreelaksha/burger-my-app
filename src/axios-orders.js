import axios from 'axios';

const instance = axios.create({
    baseURL : 'https://react-my-burger-3321f.firebaseio.com/';
});

export default instance;

