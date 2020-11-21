import { getHttp, deleteHttp, putHttp, postHttp } from './http';
import _get from 'lodash/get';

const getAll = () => {
  return getHttp('USERS.GET_ALL').then(res => {
    return _get(res, 'data');
  });
};

const deleteUser = (id) => {
  return deleteHttp('USERS.DELETE', id).then(res => {
    return _get(res, 'data');
  });
};

const getUserByUserName = (username) => {
  return getHttp('USERS.GET_BY_USERNAME', username).then(res => {
    return _get(res, 'data');
  });
};

const getUserById = (id) => {
  return getHttp('USERS.GET_BY_ID', id).then(res => {
    return _get(res, 'data');
  });
};

const updateUserById = (id, data) => {
  return putHttp('USERS.UPDATE', id, data).then(res => {
    return _get(res, 'data');
  });
};

const createUser = (data) => {
  return postHttp('USERS.CREATE', data).then(res => {
    return _get(res, 'data');
  });
};

const users = {
  getAll,
  deleteUser,
  getUserByUserName,
  getUserById,
  updateUserById,
  createUser
};

export default users;
