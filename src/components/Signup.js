import React, { useReducer, useEffect, useinfo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
  const navigate = useNavigate();

  const init = {
    username: '',
    password: '',
    fname: '',
    lname: '',
    email: '',
    contact: '',
    ucatid_fk: '',
    address: {
      addline1: '',
      addline2: '',
      state: '',
      city: '',
      pincode: '',
    },
    qid_fk: '',
    ans: '',
  };

  const init1 = {
    username: { value: '', valid: false, touched: false, error: '' },
    password: { value: '', valid: false, touched: false, error: '' },
    fname: { value: '', valid: false, touched: false, error: '' },
    lname: { value: '', valid: false, touched: false, error: '' },
    email: { value: '', valid: false, touched: false, error: '' },
    contact: { value: '', valid: false, touched: false, error: '' },
    // ucatid_fk: { value: '', valid: false, touched: false, error: '' },
    addline1: { value: '', valid: false, touched: false, error: '' },
    state: { value: '', valid: false, touched: false, error: '' },
    city: { value: '', valid: false, touched: false, error: '' },
    pincode: { value: '', valid: false, touched: false, error: '' },
    // qid_fk: { value: '', valid: false, touched: false, error: '' },
    ans: { value: '', valid: false, touched: false, error: '' },
  };
  // console.log(isFormValid);

  var reducer = (state, action) => {
    switch (action.type) {
      case 'register':
        return {
          ...state,
          [action.field]: action.val,
          // [action.field]: { ...info[action.field],[action.field]: action.val },
          address: {
            ...state.address,
            [action.field]: action.val,
          },
        };
      case 'update': {
        const { name, value, valid, error, touched } = action.data;
        return {
          ...state,
          [name]: { ...state[name], value, valid, error, touched },
        }; //modifying and returning new object as info
      }
      case 'reset': {
        return init1;
      }
    }
  };

  const validate = (name, value) => {
    let valid = true;
    let error = '';
    let touched = true;
    switch (name) {
      case 'username':
        var re = /^[a-zA-Z0-9_]{3,16}$/;
        if (!re.test(value)) {
          error = 'Enter valid Username';
        } else {
          valid = true;
          error = '';
        }
        break;
      case 'password':
        var re1 = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/;
        if (!re1.test(value)) {
          error =
            'Contains at least one letter (upper or lower case),Contains at least one digit,Is at least 8 characters long,Can contain special characters: @$!%*#?&';
        } else {
          valid = true;
          error = '';
        }
        break;
      case 'fname':
        var re2 = /^[A-Z]{1}[a-z]{1,20}$/;
        if (!re2.test(value)) {
          error =
            'First letter - capital, rest -small,max 20 characters allowed';
        } else {
          valid = true;
          error = '';
        }
        break;
      case 'lname':
        var re3 = /^[A-Z]{1}[a-z]{1,20}$/;
        if (!re3.test(value)) {
          error =
            'First letter - capital, rest -small,max 20 characters allowed';
        } else {
          valid = true;
          error = '';
        }
        break;
      case 'email':
        var re4 = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
        if (!re4.test(value)) {
          error = 'Enter valid Email';
        } else {
          valid = true;
          error = '';
        }
        break;
      case 'contact':
        var re5 = /^[0-9]{10}$/;
        if (!re5.test(value)) {
          error = 'Enter valid number';
        } else {
          valid = true;
          error = '';
        }
        break;
      // case 'ucatid_fk':
      //   var re6 = /^[A-Za-z]{1,20}$/;
      //   if (!re6.test(value)) {
      //     error = 'Select Type';
      //   } else {
      //     valid = true;
      //     error = '';
      //   }
      //   break;
      case 'addline1':
        var re7 = /^[a-zA-Z0-9\s\.,#'-]{3,100}$/;
        if (!re7.test(value)) {
          error = 'Enter valid address';
        } else {
          valid = true;
          error = '';
        }
        break;
      case 'state':
        var re8 = /^[A-Za-z]{1,20}$/;
        if (!re8.test(value)) {
          error = 'Select state';
        } else {
          valid = true;
          error = '';
        }
        break;
      case 'city':
        var re9 = /^[A-Z]{1}[a-z]{2,15}$/;
        if (!re9.test(value)) {
          error = 'Enter valid city name';
        } else {
          valid = true;
          error = '';
        }
        break;
      case 'pincode':
        var re10 = /^[0-9]{6}$/;
        if (!re10.test(value)) {
          error = 'Enter valid pincode';
          // add;
        } else {
          valid = true;
          error = '';
        }
        break;

      // case 'qid_fk':
      //   var re11 = /^$/;
      //   if (!re11.test(value)) {
      //     error = 'Select question';
      //   } else {
      //     valid = true;
      //     error = '';
      //   }
      //   break;
      case 'ans':
        var re12 = /^[A-Z]{1}[a-z]{2,15}$/;
        if (!re12.test(value)) {
          error = 'Enter valid answer';
        } else {
          valid = true;
          error = '';
        }
        break;
    }
    dispatch1({ type: 'update', data: { name, value, valid, error, touched } });
  };

  const [user, dispatch] = useReducer(reducer, init);
  const [info, dispatch1] = useReducer(reducer, init1);

  useEffect(() => {
    var userSel = document.getElementById('usertype');
    var queSel = document.getElementById('secque');

    fetch('http://localhost:8080/getusertypes')
      .then((res) => res.json())
      .then((res) => {
        // console.log(res);
        res.map((v) => {
          var opt = document.createElement('option');
          opt.value = v.ucatid;
          opt.textContent = v.cattype;
          userSel.appendChild(opt);
        });
      });

    fetch('http://localhost:8080/getsecque')
      .then((res) => res.json())
      .then((res) => {
        res.map((q) => {
          var opt1 = document.createElement('option');
          opt1.value = q.qid;
          opt1.textContent = q.question;
          queSel.appendChild(opt1);
        });
      });
  }, []);

  const [unameerror, setUnameerror] = useState('');

  var register = (e) => {
    e.preventDefault();
    const options = {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(user),
    };
    fetch('http://localhost:8080/signup', options)
    //By passing the "options" object as the second argument to the "fetch" function, 
    //it allows us to specify how the request should be made and what data should be 
    //sent to the server.
      .then((res) => {
        if (res.ok) {
          navigate('/login');
        }
      })
      .catch((err) => {
        console.log(err);
      });
    // fetch(`http://localhost:8080/getuserbyun/${user.username}`)
    //   .then((res) => {
    //     // console.log(res.text());
    //     return res.text();
    //   })
    //   .then((res) => {
    //     console.log(res);
    //     if (res.length != 0) {
    //       console.log('Invalid Username');
    //       setUnameerror('Username already exist enter another one');
    //       alert('Username already exists,Enter unique username');
    //       navigate('/signup');
    //     } else {
    //       return JSON.parse(res);
    //     }
    //   })
    //   .then((res) => {

    //   });
    // .then((text) => (text.length ? JSON.parse(text) : {}))
    // .then((res) => {
    //   if (res != null) {
    //     console.log('Invalid Username');
    //     setUnameerror('Username already exist enter another one');
    //     alert('Username already exists,Enter unique username');
    //     navigate('/signup');
    //   } else {

    //   }
    //   return res;
    // })
    // .catch((err) => {
    //   console.log(err);
    // });
    // console.log(`ucatid_fk:${user.ucatid_fk}`);

    // console.log(`ucatid_fk:${user.ucatid_fk}`);
  };

  const navigateToLogin = () => {
    navigate('/login');
  };

  return (
    <div className='form-container'>
      <form className='login-form signup-form'>
        <div className='mb-3'>
          <h4>Signup</h4>
        </div>
        <div className='mb-3'>
          {/* <label htmlFor='username'>Username : </label> */}
          <input
            type='text'
            placeholder='Enter Username'
            className='form-control form-control-sm'
            name='username'
            id='username'
            value={info.username.value}
            required
            onChange={(e) => {
              {
                validate('username', e.target.value);
              }
              dispatch({
                type: 'register',
                field: e.target.name,
                val: e.target.value,
              });
            }}
          />
        </div>
        <p>{unameerror}</p>
        <p
          style={{
            display:
              info.username.touched && info.username.valid ? 'block' : 'none',
            color: 'red',
          }}
        >
          {' '}
          {info.username.error}{' '}
        </p>
        <div className='mb-3'>
          <input
            type='password'
            placeholder='Enter Password'
            name='password'
            id='pwd'
            value={info.password.value}
            className='form-control form-control-sm'
            required
            onChange={(e) => {
              {
                validate('password', e.target.value);
              }
              dispatch({
                type: 'register',
                field: e.target.name,
                val: e.target.value,
              });
            }}
          />
        </div>
        <p
          style={{
            display:
              info.password.touched && info.password.valid ? 'block' : 'none',
            color: 'red',
          }}
        >
          {' '}
          {info.password.error}{' '}
        </p>
        <div className='mb-3'>
          <input
            type='text'
            placeholder='Enter firstname'
            name='fname'
            id='fname'
            value={info.fname.value}
            className='form-control form-control-sm'
            required
            onChange={(e) => {
              {
                validate('fname', e.target.value);
              }
              dispatch({
                type: 'register',
                field: e.target.name,
                val: e.target.value,
              });
            }}
          />
        </div>
        <p
          style={{
            display: info.fname.touched && info.fname.valid ? 'block' : 'none',
            color: 'red',
          }}
        >
          {' '}
          {info.fname.error}{' '}
        </p>
        <div className='mb-3'>
          <input
            type='text'
            placeholder='Enter last name'
            name='lname'
            id='lname'
            value={info.lname.value}
            className='form-control form-control-sm'
            required
            onChange={(e) => {
              {
                validate('lname', e.target.value);
              }
              dispatch({
                type: 'register',
                field: e.target.name,
                val: e.target.value,
              });
            }}
          />
        </div>
        <p
          style={{
            display: info.lname.touched && info.lname.valid ? 'block' : 'none',
            color: 'red',
          }}
        >
          {' '}
          {info.lname.error}{' '}
        </p>
        <div className='mb-3'>
          <input
            type='email'
            placeholder='Enter email'
            name='email'
            id='email'
            value={info.email.value}
            className='form-control form-control-sm'
            required
            onChange={(e) => {
              {
                validate('email', e.target.value);
              }
              dispatch({
                type: 'register',
                field: e.target.name,
                val: e.target.value,
              });
            }}
          />
        </div>
        <p
          style={{
            display: info.email.touched && info.email.valid ? 'block' : 'none',
            color: 'red',
          }}
        >
          {' '}
          {info.email.error}{' '}
        </p>
        <div className='mb-3'>
          <input
            type='number'
            placeholder='Enter contact no'
            name='contact'
            id='contact'
            value={info.contact.value}
            className='form-control form-control-sm'
            required
            onChange={(e) => {
              {
                validate('contact', e.target.value);
              }
              dispatch({
                type: 'register',
                field: e.target.name,
                val: e.target.value,
              });
            }}
          />
        </div>
        <p
          style={{
            display:
              info.contact.touched && info.contact.valid ? 'block' : 'none',
            color: 'red',
          }}
        >
          {' '}
          {info.contact.error}{' '}
        </p>
        <div className='mb-3'>
          <label htmlFor=''>Select User type</label>
          <select
            className='form-control form-control-sm'
            name='ucatid_fk'
            id='usertype'
            required={true}
            // value={info.ucatid_fk.value}
            onChange={(e) => {
              dispatch({
                type: 'register',
                field: e.target.name,
                val: e.target.value,
              });
            }}
          >
            <option defaultValue={''}>Choose...</option>
          </select>
        </div>
        <div className='mb-3'>
          <label htmlFor='inputAddress'>Address1</label>
          <input
            type='text'
            className='form-control form-control-sm'
            name='addline1'
            id='addline1'
            value={info.addline1.value}
            placeholder='1234 Main St'
            required
            onChange={(e) => {
              {
                validate('addline1', e.target.value);
              }
              dispatch({
                type: 'register',
                field: e.target.name,
                val: e.target.value,
              });
            }}
          />
        </div>
        <p
          style={{
            display:
              info.addline1.touched && info.addline1.valid ? 'block' : 'none',
            color: 'red',
          }}
        >
          {' '}
          {info.addline1.error}{' '}
        </p>
        <div className='mb-3'>
          <label htmlFor='inputAddress2'>Address 2</label>
          <input
            type='text'
            className='form-control form-control-sm'
            name='addline2'
            id='inputAddress2'
            placeholder='Apartment, studio, or floor'
            onChange={(e) => {
              dispatch({
                type: 'register',
                field: e.target.name,
                val: e.target.value,
              });
            }}
          />
        </div>
        <div className='form-row'>
          <div className='mb-3 col-md-6'>
            <label htmlFor='inputstate'>state</label>
            <select
              name='state'
              id='inputstate'
              value={info.state.value}
              className='form-control form-control-sm'
              required={true}
              onChange={(e) => {
                {
                  validate('state', e.target.value);
                }
                dispatch({
                  type: 'register',
                  field: e.target.name,
                  val: e.target.value,
                });
              }}
            >
              <option defaultValue={''}>Choose...</option>
              <option value='AN'>Andaman and Nicobar Islands</option>
              <option value='AP'>Andhra Pradesh</option>
              <option value='AR'>Arunachal Pradesh</option>
              <option value='AS'>Assam</option>
              <option value='BR'>Bihar</option>
              <option value='CH'>Chandigarh</option>
              <option value='CT'>Chhattisgarh</option>
              <option value='DN'>Dadra and Nagar Haveli</option>
              <option value='DD'>Daman and Diu</option>
              <option value='DL'>Delhi</option>
              <option value='GA'>Goa</option>
              <option value='GJ'>Gujarat</option>
              <option value='HR'>Haryana</option>
              <option value='HP'>Himachal Pradesh</option>
              <option value='JK'>Jammu and Kashmir</option>
              <option value='JH'>Jharkhand</option>
              <option value='KA'>Karnataka</option>
              <option value='KL'>Kerala</option>
              <option value='LA'>Ladakh</option>
              <option value='LD'>Lakshadweep</option>
              <option value='MP'>Madhya Pradesh</option>
              <option value='MH'>Maharashtra</option>
              <option value='MN'>Manipur</option>
              <option value='ML'>Meghalaya</option>
              <option value='MZ'>Mizoram</option>
              <option value='NL'>Nagaland</option>
              <option value='OR'>Odisha</option>
              <option value='PY'>Puducherry</option>
              <option value='PB'>Punjab</option>
              <option value='RJ'>Rajasthan</option>
              <option value='SK'>Sikkim</option>
              <option value='TN'>Tamil Nadu</option>
              <option value='TG'>Telangana</option>
              <option value='TR'>Tripura</option>
              <option value='UP'>Uttar Pradesh</option>
              <option value='UT'>Uttarakhand</option>
              <option value='WB'>West Bengal</option>
            </select>
          </div>
          <p
            style={{
              display:
                info.state.touched && info.state.valid ? 'block' : 'none',
              color: 'red',
            }}
          >
            {' '}
            {info.state.error}{' '}
          </p>
          <div className='row'>
            <div className='mb-3 col-md-6'>
              <label htmlFor='inputCity'>City</label>
              <input
                type='text'
                className='form-control form-control-sm'
                name='city'
                id='city'
                value={info.city.value}
                required
                onChange={(e) => {
                  {
                    validate('city', e.target.value);
                  }
                  dispatch({
                    type: 'register',
                    field: e.target.name,
                    val: e.target.value,
                  });
                }}
              />
            </div>
            <p
              style={{
                display:
                  info.city.touched && info.city.valid ? 'block' : 'none',
                color: 'red',
              }}
            >
              {' '}
              {info.city.error}{' '}
            </p>
            <div className='mb-3 col-md-6'>
              <label htmlFor='inputZip'>Pincode</label>
              <input
                type='text'
                className='form-control form-control-sm'
                name='pincode'
                id='pincode'
                value={info.pincode.value}
                required
                onChange={(e) => {
                  {
                    validate('pincode', e.target.value);
                  }
                  dispatch({
                    type: 'register',
                    field: e.target.name,
                    val: e.target.value,
                  });
                }}
              />
            </div>
            <p
              style={{
                display:
                  info.pincode.touched && info.pincode.valid ? 'block' : 'none',
                color: 'red',
              }}
            >
              {' '}
              {info.pincode.error}{' '}
            </p>
          </div>
        </div>
        <div className='mb-3 form-row'>
          <label htmlFor='secque'>Select security question</label>
          <select
            name='qid_fk'
            id='secque'
            // value={info.qid_fk.value}
            className='form-control form-control-sm'
            required={true}
            onChange={(e) => {
              dispatch({
                type: 'register',
                field: e.target.name,
                val: e.target.value,
              });
            }}
          >
            <option defaultValue={''}>Choose...</option>
          </select>
        </div>
        <div className='mb-3 form-row'>
          <input
            type='text'
            className='form-control form-control-sm'
            name='ans'
            id='ans'
            value={info.ans.value}
            placeholder='Enter answer'
            required
            onChange={(e) => {
              {
                validate('ans', e.target.value);
              }
              dispatch({
                type: 'register',
                field: e.target.name,
                val: e.target.value,
              });
            }}
          />
        </div>
        <p
          style={{
            display: info.ans.touched && info.ans.valid ? 'block' : 'none',
            color: 'red',
          }}
        >
          {' '}
          {info.ans.error}{' '}
        </p>
        <button
          type='submit'
          className='btn btn-primary'
          // disabled={info.isFormValid?false:true}
          disabled={
            info.username.valid &&
            info.password.valid &&
            info.fname.valid &&
            info.lname.valid &&
            info.email.valid &&
            info.contact.valid &&
            info.addline1.valid &&
            info.state.valid &&
            info.city.valid &&
            info.pincode.valid &&
            info.ans.valid
              ? false
              : true
          }
          onClick={(e) => {
            register(e);
          }}
        >
          Register
        </button>
        &nbsp; &nbsp;
        <input
          type='reset'
          value='Clear'
          className='btn btn-primary'
          onClick={() => {
            dispatch1({ type: 'reset' });
          }}
        />
      </form>
    </div>
  );
}
