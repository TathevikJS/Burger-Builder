import axios from 'axios';

const instance = axios.create({
    baseURL:  'https://burger-project-22e9d.firebaseio.com'
});

export default instance;