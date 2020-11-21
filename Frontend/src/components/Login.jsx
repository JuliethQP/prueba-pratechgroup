
import { useState } from 'react';
import { Redirect, useHistory } from 'react-router';
import { Link } from "react-router-dom";
import api from '../api/';

export default function Login() {
  const [loginInfo, setloginInfo] = useState({
    username: '',
    password: ''
  })
  const history = useHistory()

  function verifyUser(e) {
    const { name, value } = e.target
    setloginInfo(prevState => ({
      ...prevState,
      [name]: value
    }))
  }

  async function goToHome(e) {
    e.preventDefault()
    const response = await api.users.getUserByUserName(`/${loginInfo.username}`);
    if (response !== null && response.password === loginInfo.password) {
      localStorage.setItem("data username", loginInfo.username);
      history.push('/home')
    }
    else {
      alert("You don't have an account, please create one")
    }
  }

  const dataLocalStorage = localStorage.getItem('data username')
  return (
    <div className="container-form">
      {
        dataLocalStorage ? <Redirect to="/home" />
          :
          <div className="mx-auto container py-5 box">
            <div className="container-title">
              <span>System</span>
            </div>
            <form onSubmit={goToHome}>
              <input
                placeholder="User name"
                type="text"
                name="username"
                value={loginInfo.username}
                onChange={verifyUser}
                className="input"
                required
              />
              <input
                placeholder="password"
                type="password"
                name="password"
                value={loginInfo.password}
                onChange={verifyUser}
                className="input"
                required
              />
              <button className="button" >Log In</button>
            </form>
            <p className="padding"> Don't have an account?</p>
            <Link to="/create/account">Create Account</Link>
          </div>
      }
    </div>
  )
}
