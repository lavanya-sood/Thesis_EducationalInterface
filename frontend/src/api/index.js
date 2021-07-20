import axios from 'axios';

const url = 'http://localhost:5000/module';

export const fetchModule = () => axios.get(url);