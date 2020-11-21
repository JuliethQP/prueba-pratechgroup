import React, { useState, useEffect, Fragment } from 'react';
import _map from 'lodash/map';
import _every from 'lodash/every';
import _get from 'lodash/get';
import _reduce from 'lodash/reduce';
import _includes from 'lodash/includes'
import { useHistory } from 'react-router';
import api from '../../api';
import userInfoModel from './userInfoModel.json';
import professionList from './professionList.json';
import fieldsToRemove from './fieldsToRemove.json'

export default function CreateAccount(props) {
  const [userInfo, setuserInfo] = useState(userInfoModel);
  const [userId, setUserId] = useState('');
  const professions = professionList;
  const history = useHistory();

  useEffect(() => {
    const id = _get(props, 'match.params.id');
    setUserId(id);
    if (id) {
      async function getUser(id) {
        const response = await api.users.getUserById(`/${id}`);
        const user = _reduce(response, (accumulator, property, key) => {
          if (!_includes(fieldsToRemove, key)) {
            accumulator = { ...accumulator, [key]: property };
          }
          return accumulator;
        }, {});
        setuserInfo(user)
      }
      getUser(id);
    }
  }, [props])

  function saveUserDate(e) {
    const { name, value } = e.target
    setuserInfo(prevState => ({
      ...prevState,
      [name]: value
    }))
  }

  async function updateUser() {
    const userInfoWithoutPasswords = _reduce(userInfo, (accumulator, property, key) => {
      if (key !== 'confirmPassword' && key !== 'password') {
        accumulator = { ...accumulator, [key]: property };
      }
      return accumulator;
    }, {});
    const fieldsValidation = _map(userInfoWithoutPasswords, (property) => property !== '');
    const areFieldsValid = _every(fieldsValidation, (field) => field === true);
    if (areFieldsValid) {
      const response = await api.users.updateUserById(userId, userInfoWithoutPasswords);
      if (response.message === 'User updated') {
        alert('User updated')
        history.push('/home');
      } else {
        alert('Can not update user')
      }
    }
  }

  async function createUser() {
    const fieldsValidation = _map(userInfo, (property) => property !== '');
    const areFieldsValid = _every(fieldsValidation, (field) => field === true);
    if (areFieldsValid && _get(userInfo, 'password') === _get(userInfo, 'confirmPassword')) {
      const userInfoWithoutConfirmPassword = _reduce(userInfo, (accumulator, property, key) => {
        if (key !== 'confirmPassword') {
          accumulator = { ...accumulator, [key]: property };
        }
        return accumulator;
      }, {});
      const response = await api.users.createUser(userInfoWithoutConfirmPassword);
      if (response.message === 'User created') {
        alert('User created');
        localStorage.setItem('data username', userInfo.username);
        history.push('/home');
      } else {
        console.log(response)
        alert('Can not create user')
      }
    }
  }

  async function sendForm(e) {
    e.preventDefault();
    if (userId) {
      updateUser();
    } else {
      const response = await api.users.getUserByUserName(`/${userInfo.username}`);
      response === null ? createUser() : alert('This user already exists');
    }
  }

  return (
    <div className="container-form">
      <span onClick={() => history.goBack()} className="d-flex justify-content-center text"><strong>Return</strong></span>
      <div className=" mx-auto container py-5 box">
        <div className="container-title">
          <span>Register</span>
        </div>
        <form onSubmit={sendForm}>
          <input
            placeholder="user Name"
            type="text"
            name="username"
            value={userInfo.username}
            onChange={saveUserDate}
            required
            className="input"
          />
          <input
            type="email"
            name="email"
            value={userInfo.email}
            onChange={saveUserDate}
            className="input"
            placeholder="email"
            required
          />
          {!userId && (
            <Fragment>
              <input
                type="password"
                name="password"
                value={userInfo.password}
                onChange={saveUserDate}
                placeholder="password"
                className="input"
                required
              />
              <input
                type="password"
                value={userInfo.confirmPassword}
                name="confirmPassword"
                onChange={saveUserDate}
                placeholder="confirm password"
                className="input"
                required
              />
            </Fragment>
          )}
          <input
            type="date"
            value={userInfo.birthday}
            name="birthday"
            onChange={saveUserDate}
            required
            placeholder="Birthday"
            className="input"
          />
          <div className="radio">
            <p>Select gender</p>
            <div >
              <input
                type="radio"
                name="gender"
                value="female"
                onChange={saveUserDate}
                required
                checked={userInfo.gender === 'female'}
              />
              <label className="padding">Female</label>
            </div>
            <div>
              <input
                type="radio"
                name="gender"
                value="male"
                onChange={saveUserDate}
                required
                checked={userInfo.gender === 'male'}
              />
              <label className="padding">Male</label>
            </div>
            <div>
              <input
                type="radio"
                name="gender"
                value="other"
                onChange={saveUserDate}
                required
                checked={userInfo.gender === 'other'}
              />
              <label className="padding">Other</label>
            </div>
          </div>
          <div className="radio padding">
            <p>Select profession</p>
            <select
              className="input"
              onChange={saveUserDate}
              name="profession"
              required
            >
              {professions.map((profession, index) =>
                <option key={index} value={profession}>{profession}</option>
              )}
            </select>
          </div>
          <input
            value={userInfo.phoneNumber}
            name="phoneNumber"
            onChange={saveUserDate}
            pattern="[0-9\s]+"
            maxLength="10"
            placeholder="Phone Number"
            className="input"
            required
          />
          <button className="button" >Verify and create user</button>
        </form>
      </div >
    </div>
  )
}
