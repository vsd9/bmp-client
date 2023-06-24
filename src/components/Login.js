import React, { useReducer, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loggedSlice, login } from './slice';
import { useDispatch } from 'react-redux';
import './style.css';
import store from './store';

function Login() {
  const init = {
    username: '',
    password: '',
  };

  var reducer = (state, action) => {
    switch (action.type) {
      case 'logincheck':
        return { ...state, [action.field]: action.val };
    }
  };

  const [user, dispatch] = useReducer(reducer, init);
  const [msg, setMsg] = useState('');

  const navigate = useNavigate();
  const reduxAction = useDispatch();

//  return (
//     <div className="App">
//       <div className="login-form">
//       <div className="title">Sign In</div>
//       {isSubmitted ? <div>User is successfully logged in</div> : renderForm}
//       </div>
//       <h1>vishal</h1>
//     </div>
//   );


  var logincheck = (u) => {
    u.preventDefault();
    const options = {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(user),
    };

    fetch('http://localhost:8080/logincheck', options)
      .then((res) => {
        if (res.ok) {
          return res.text();
        } else {
          throw new Error('server Error');
        }
      })
      .then((text) => (text.length ? JSON.parse(text) : {}))
      .then((obj) => {
        if (Object.keys(obj).length === 0) {
          setMsg('Invalid username/password');
        } else {
          //Setting state in store
          var userid = obj.userid;
          var ucatid_fk = obj.ucatid_fk;
          reduxAction(login({ userid, ucatid_fk }));

          if (obj.ucatid_fk === 1) {
            // navigate("/AdminHomepage");
            navigate('/');
          } else if (obj.ucatid_fk === 2) {
            // navigate('/OwnerHomepage');
            navigate('/myproperties');
          } else if (obj.ucatid_fk === 3) {
            navigate('/CustHomepage');
          }
        }
      })
      .catch((error) => alert('Server error...'));
  };
  return (
    <div className='form-container'>
      <div className='login-form'>
        <div className='form'>
          <form>
            <div className='mb-3'>
              <h4>Login</h4>
            </div>
            <div className='input-container'>
              <input
                type='text'
                name='username'
                value={user.username}
                required
                placeholder='Username'
                onChange={(u) => {
                  dispatch({
                    type: 'logincheck',
                    field: u.target.name,
                    val: u.target.value,
                  });
                }}
              />
            </div>
            <div className='input-container'>
              <input
                type='password'
                name='password'
                value={user.password}
                required
                placeholder='Password'
                onChange={(u) => {
                  dispatch({
                    type: 'logincheck',
                    field: u.target.name,
                    val: u.target.value,
                  });
                }}
              />
            </div>
            <div className='button-container'>
              <input
                type='submit'
                onClick={(u) => {
                  logincheck(u);
                }}
              />
            </div>
          </form>
          <p>{msg}</p>
        </div>
      </div>
    </div>
  );
}

export default Login;


