import React, { useReducer, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function AddProperty() {
  // const navigate = useNavigate();

  const myState = useSelector((state) => state.logged);
  useEffect(() => {
    var ftype = document.getElementById('flattype');
    var ptype = document.getElementById('propertytype');

    fetch('http://localhost:8080/getflattype')
      .then((res) => res.json())
      .then((res) => {
        console.log(res);

        res.map((v) => {
          var opt = document.createElement('option');
          opt.value = v.ftypeid;
          opt.textContent = v.ftype;
          ftype.appendChild(opt);
        });
      });

    fetch('http://localhost:8080/getproptype')
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        res.map((p) => {
          var opt1 = document.createElement('option');
          opt1.value = p.ptypeid;
          opt1.textContent = p.ptype;
          ptype.appendChild(opt1);
        });
      });
  }, []);
  //This code is likely used to populate a dropdown select element on a webpage with flat type options fetched from the server.

  const navigate = useNavigate();

  const init = {
    ftypeid: '',
    ptypeid: '',
    price: '',
    status: '',
    email: '',
    userid: '',
    address: {
      addline1: '',
      addline2: '',
      state: '',
      city: '',
      pincode: '',
    },
    s_status:'Not dealed'
  };

  var reducer = (state, action) => {
    switch (action.type) {
      case 'addprop':
        return {
          ...state,
          [action.field]: action.val,
          address: {
            ...state.address,
            [action.field]: action.val,
          },
          //   flaytype: {
          //     ...state.address,
          //     [action.field]: action.val,
        };
    }
  };

  const [property, dispatch] = useReducer(reducer, init);

  var addprop = (e) => {
    e.preventDefault();
    property.userid = myState.userId;
    const options = {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(property),
    };
    fetch('http://localhost:8080/addproperty', options)
      .then((res) => {
        if (res.ok) {
          navigate('/myproperties');
        }
      })

      .catch((err) => console.log(err));
  };

  return (
    <div className='form-container'>
      <form className='login-form signup-form'>
        <div className='mb-3'>
          <h4>Add Property</h4>
        </div>
        <div className='mb-3'>
          <label htmlFor=''>Select Flat type</label>
          <select
            className='form-control form-control-sm'
            name='ftypeid'
            id='flattype'
            required
            onChange={(e) => {
              dispatch({
                type: 'addprop',
                field: e.target.name,
                val: e.target.value,
              });
            }}
          >
            <option defaultValue={''}>Choose flat type...</option>
          </select>
        </div>
        <div className='mb-3'>
          <label htmlFor=''>Select Property type</label>
          <select
            className='form-control form-control-sm'
            name='ptypeid'
            id='propertytype'
            required
            onChange={(e) => {
              dispatch({
                type: 'addprop',
                field: e.target.name,
                val: e.target.value,
              });
            }}
          >
            <option defaultValue={''}>Choose property type...</option>
          </select>
        </div>
        <div className='mb-3'>
          <input
            type='text'
            placeholder='Enter Price'
            className='form-control form-control-sm'
            name='price'
            id='price'
            pattern='[0-9]{4,10}'
            title='Enter valid price'
            required
            onChange={(e) => {
              dispatch({
                type: 'addprop',
                field: e.target.name,
                val: e.target.value,
              });
            }}
          />
        </div>
        <div className='mb-3'>
          <label htmlFor='inputAddress'>Address1</label>
          <input
            type='text'
            className='form-control form-control-sm'
            name='addline1'
            id='inputAddress'
            placeholder='1234 Main St'
            required
            onChange={(e) => {
              dispatch({
                type: 'addprop',
                field: e.target.name,
                val: e.target.value,
              });
            }}
          />
        </div>
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
                type: 'addprop',
                field: e.target.name,
                val: e.target.value,
              });
            }}
          />
        </div>
        <div className='form-row'>
          <div className='mb-3 col-md-6'>
            <label htmlFor='inputState'>State</label>
            <select
              name='state'
              id='inputState'
              className='form-control form-control-sm'
              required
              onChange={(e) => {
                dispatch({
                  type: 'addprop',
                  field: e.target.name,
                  val: e.target.value,
                });
              }}
            >
              <option defaultValue={''}>Choose...</option>
              <option>Maharashtra</option>
              <option>Delhi</option>
              <option>Madhya-Prades</option>
            </select>
          </div>
          <div className='row'>
            <div className='mb-3 col-md-6'>
              <label htmlFor='inputCity'>City</label>
              <input
                type='text'
                className='form-control form-control-sm'
                name='city'
                id='inputCity'
                required
                onChange={(e) => {
                  dispatch({
                    type: 'addprop',
                    field: e.target.name,
                    val: e.target.value,
                  });
                }}
              />
            </div>
            <div className='mb-3 col-md-6'>
              <label htmlFor='inputZip'>Pincode</label>
              <input
                type='text'
                className='form-control form-control-sm'
                name='pincode'
                id='inputZip'
                required
                onChange={(e) => {
                  dispatch({
                    type: 'addprop',
                    field: e.target.name,
                    val: e.target.value,
                  });
                }}
              />
            </div>
          </div>
        </div>

        <button
          type='submit'
          className='btn btn-primary'
          onClick={(e) => {
            addprop(e);
          }}
        >
          Add Property
        </button>
      </form>
    </div>
  );
}
