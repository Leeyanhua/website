import { asyncPost, asyncGet, asyncPut, asyncDelete } from './FetchAsync';

export const postAuthCode = (options, cb) => {
  asyncPost('/api/users/get-phone-code', options).then((result) => {
    console.log('验证码', result);
    if (result && cb) cb(result);
  });
};
export const postSignup = (options, cb) => {
  asyncPost('/api/users/signup-phone', options).then((result) => {
    console.log('注册', result);
    if (result && cb) cb(result);
  });
};

export const login = (options, cb) => {
  asyncPost('/api/users/login-phone', options).then((result) => {
    console.log('登录', result);
    if (result && cb) cb(result);
  });
};
export const getUser = (options, cb) => {
  const url = '/api/users/self';
  asyncGet(url).then((result) => {
    if (result && cb) cb(result);
  });
};
export const putSelf = (options, cb) => {
  asyncPut('/api/users/self', options).then((result) => {
    if (result && cb) cb(result);
  });
};
export const putPassword = (options, cb) => {
  asyncPut('/api/users/password', options).then((result) => {
    console.log('更新密码', result);
    if (result && cb) cb(result);
  });
};
export const putColPo = (options, cb) => {
  const url = `/api/users/policy/${options}`;
  asyncPut(url, {}).then((result) => {
    console.log('收藏政策', result);
    if (result && cb) cb(result);
  });
};
export const deleteCollect = (options, cb) => {
  const url = `/api/users/policy/${options}`;
  asyncDelete(url, {}).then((result) => {
    console.log('删除政策收藏', result);
    if (result && cb) cb(result);
  });
};
export const putColIncu = (options, cb) => {
  const url = `/api/users/space/${options}`;
  asyncPut(url, {}).then((result) => {
    console.log('收藏空间', result);
    if (result && cb) cb(result);
  });
};
export const deleteColIncu = (options, cb) => {
  const url = `/api/users/space/${options}`;
  asyncDelete(url, {}).then((result) => {
    console.log('删除空间收藏', result);
    if (result && cb) cb(result);
  });
};
export const getUserPolicyList = (options, cb) => {
  const url = '/api/users/policy/';
  asyncGet(url).then((result) => {
    console.log('获取收藏政策数量', result);
    if (result && cb) cb(result);
  });
};
export const getUserSpaceList = (options, cb) => {
  const url = '/api/users/space/';
  asyncGet(url).then((result) => {
    console.log('获取空间收藏数量', result);
    if (result && cb) cb(result);
  });
};
export const getPolicyServer = (options, cb) => {   // 获取政策服务信息
  const url = '/api/users/apply_policy';
  asyncGet(url).then((result) => {
    if (result && cb) cb(result);
  });
};
export const getSpaceServer = (options, cb) => {   // 获取空间服务信息
  const url = '/api/users/apply_space';
  asyncGet(url).then((result) => {
    if (result && cb) cb(result);
  });
};
export const getSignOut = (options, cb) => {   // 退出登录
  const url = '/api/users/logout';
  asyncGet(url).then((result) => {
    console.log('get out url', result);
    if (result && cb) cb(result);
  });
};
