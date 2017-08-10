import { asyncGet, asyncGetAmap, asyncPost } from './FetchAsync';

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

// export const getPoint = (options, cb) => {
//   asyncGet('/api/incubator').then((result) => {
//     if (cb) cb(result);
//   });
// };

export const getPolicySearch = (options, cb) => {
  let url = '/api/policy?a=a';
  if (options.value) {
    url += `&value=${options.value}`;
  }
  if (options.page) {
    url += `&page=${options.page}`;
  }
  asyncGet(url).then((result) => {
    if (result && cb) cb(result);
  });
};
export const getPolicyArticle = (options, cb) => {
  const url = `/api/policy/${options}`;
  asyncGet(url).then((result) => {
    if (result && cb) cb(result);
  });
};

export const postPolicy = (options, cb) => {
  asyncPost('/api/apply_policy', options).then((result) => {
    console.log('上传', result);
    if (result && cb) cb(result);
  });
};
export const getTags = (options, cb) => {
  const url = '/api/policy/keywords';
  asyncGetAmap(url).then((result) => {
    if (result && cb) cb(result);
  });
};
