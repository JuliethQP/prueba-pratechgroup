import React, { Fragment, useEffect, useState } from 'react';
import _cloneDeep from 'lodash/cloneDeep';
import _map from 'lodash/map';
import api from '../api';
import { Link, useHistory } from "react-router-dom"

export default function Home() {
  const [allUsers, setAllUsers] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const tableHeading = ['Username', 'Email', 'Birtday', 'Profession'];
  const history = useHistory();

  useEffect(() => {
    async function getAllUsers() {
      const response = await api.users.getAll();
      setAllUsers(response);
    }
    getAllUsers();
  }, [])

  async function deleleteUser(id, position) {
    await api.users.deleteUser(id);
    let usersCopy = _cloneDeep(allUsers);
    usersCopy.splice(position, 1);
    setAllUsers(usersCopy);
  }
  function logout() {
    localStorage.removeItem('data username');
    history.push('/');
  }

  return (
    <Fragment>
      <div className="container ligth-theme mt-5">
        <nav className="container-flex ">
          <div className="d-flex bd-highlight">
            <div className="mr-auto p-2 bd-highlight">
              <div >
                <span className="container-title">System</span>
                <span className="p-2 text-success"> {localStorage.getItem('data username')}</span>
              </div>
            </div>
            <div className="t-center">
              <span className="p-2 text-dark text" onClick={() => setIsAdmin(true)}>Admin</span>
              <span className="p-2 text-dark text" onClick={() => setIsAdmin(false)}>Supervisor</span>
              <span className="p-2 text-danger text" onClick={logout}>Logout</span>
            </div>
          </div>
        </nav>
        <div className=" container py-5 table-center">
          <table className="table">
            <thead>
              <tr>
                {_map(tableHeading, (title, key) =>
                  <th key={key} scope="col">{title}</th>
                )}
                {isAdmin ? <th>Administration</th> : null}
              </tr>
            </thead>
            <tbody>
              {_map(allUsers, (user, key) =>
                <tr key={key}>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.birthday}</td>
                  <td>{user.profession}</td>
                  {
                    isAdmin ?
                      <td className="p-2">
                        <button
                          className="button green-color"
                          onClick={() => deleleteUser(user._id, key)}
                        >Delete
                         </button>
                        <Link to={`/update/account/${user._id}`} className="p-2">
                          <button
                            className="button">
                            Edit
                         </button>
                        </Link>
                      </td>
                      : null
                  }
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </Fragment >
  )
}
