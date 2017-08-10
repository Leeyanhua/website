import axios from 'axios';

export const spaceList = (page) => axios.get(`/api/incubator?page=${page}`).then(res => res.data).catch(err => console.log(err));

export const spaceById = (id) => axios.get(`/api/incubator/${id}`).then(res => res.data).catch(err => console.log(err));

export const putPolicy = (id, data) => axios.put(`/api/incubator/${id}`, data).then(res => res.data).catch(err => console.log(err));