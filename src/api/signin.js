import {
  API_ADMIN_LOGIN,
  API_INFO,
  API_SIGNIN,
  API_SIGNOUT,
} from '../common/constant';
import request from '../common/request';
import Utils from '../common/utils';

export function fetchInfo(card_id) {
  const url = Utils.getApi(API_INFO);
  return request({
    url,
    method: 'get',
    params: {
      card_id,
    },
  });
}

export function fetchLogin(stu_id, password) {
  const url = Utils.getApi(API_ADMIN_LOGIN);
  return request({
    url,
    method: 'post',
    data: {
      stu_id,
      password,
    },
  });
}

export function fetchSignIn(user_id, admin_id) {
  const url = Utils.getApi(API_SIGNIN);
  return request({
    url,
    method: 'post',
    data: {
      user_id,
      admin_id,
    },
  });
}

export function fetchSignOut(user_id, admin_id) {
  const url = Utils.getApi(API_SIGNOUT);
  return request({
    url,
    method: 'post',
    data: {
      user_id,
      admin_id,
    },
  });
}
