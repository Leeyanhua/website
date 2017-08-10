import axios from 'axios';

export const policyList = (page) => axios.get(`/api/policy?page=${page}`).then(res => res.data).catch(err => console.log(err));

export const policyById = (id) => axios.get(`/api/policy/${id}`).then(res => res.data).catch(err => console.log(err));

export const putPolicy = (id, data) => axios.put(`/api/policy/${id}`, data).then(res => res.data).catch(err => console.log(err));
