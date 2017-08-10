import axios from 'axios';

export const chatList = (page) => axios.get(`/api/chat-record?page=${page}`).then(res => res.data).catch(err => console.log(err));
