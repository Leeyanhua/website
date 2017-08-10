import { asyncGet } from './FetchAsync';

export const getArea = (city, cb) => {
  const url = 'http://restapi.amap.com/v3/config/district' +
  '?key=777b20425433e59dc13e0c013911a96b' +
  `&keywords=${city}` +
  '&subdistrict=1' +
  '&showbiz=false';
  asyncGetAmap(url).then((result) => {
    if (cb) cb(result);
  });
};

export const getQuestions = (options, cb) => {
  asyncGet('/api/settings/main-questions').then((result) => {
    if (cb) cb(result);
  });
};
