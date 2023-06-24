import React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function UserValidate() {
  const [getusers, setusers] = useState([]);
  const navigate = useNavigate();

  var handleValidate = (e, id) => {
    e.preventDefault();
    fetch(`http://localhost:8080/validateuser/${id}`)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((res) => {
        console.log(res);
        navigate('/adminhomepage');
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetch('http://localhost:8080/getallusers')
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error('server Error');
        }
      })
      .then((obj) => {
        console.log(obj);
        setusers(obj);
      })
      .catch((Error) => alert('server problem ! sever is down'));
  }, []);
  return (
    <div className='form-container'>
      <h3>
        <i>Welcome User</i>
      </h3>
      <div className='login-form'>
        <div className='form'>
          <h3>
            <i>User Details</i>
          </h3>
          <form>
            <div className='input-container'>
              <table className='table'>
                <thead>
                  <tr>
                    <th scope='co1'>Id</th>
                    <th scope='co1'>fname</th>
                    <th scope='co1'>lname</th>
                    <th scope='co1'>email</th>
                    <th scope='co1'>Address</th>
                    <th scope='co1'>City</th>
                    <th scope='co1'>Pincode</th>
                    <th scope='co1'>State</th>
                    <th scope='co1'>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {getusers.map((e) => {
                    return (
                      <tr>
                        <td>{e.userid}</td>
                        <td>{e.fname}</td>
                        <td>{e.lname}</td>
                        <td>{e.email}</td>
                        <td>{e.address.addline1}</td>
                        <td>{e.address.city}</td>
                        <td>{e.address.pincode}</td>
                        <td>{e.address.state}</td>
                        <td>{e.status}</td>

                        <div>
                          <button
                            onClick={(f) => handleValidate(f, e.userid)}
                            disabled={e.status === 'Verified'}
                          >
                            {console.log(e.status)}
                            {e.status === '' ? 'Verify' : 'Verified'}
                            {/* verify */}
                          </button>
                        </div>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
