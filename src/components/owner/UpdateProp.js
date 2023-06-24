import React, { useReducer, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function UpdateProp() {
  // const navigate = useNavigate();

  const myState = useSelector((state) => state.logged);
  const location = useLocation();
  var oldProp = location.state.property;
  var index = location.state.index;
  var fType = location.state.fType;
  var pType = location.state.pType;

  let statMap = new Map();
  var keyNames = Object.keys(oldProp);
  keyNames.forEach((v) => {
    statMap.set(v, false);
  });

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

  const navigate = useNavigate();

  const init = {
    pid: '',
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

  var updateprop = (e) => {
    e.preventDefault();
    property.pid = oldProp.pid;
    property.userid = oldProp.userid;

    keyNames.forEach((v) => {
      if (v === 'address') {
        var keyNames2 = Object.keys(property.address);
        keyNames2.map((m) => {
          if (property.address[m] === '') {
            // console.log(oldProp.address[m]);
            property.address[m] = oldProp.address[m];
          }
        });
      } else if (property[v] === '') {
        // console.log(oldProp[v]);
        property[v] = oldProp[v];
      }
    });

    console.log(property);
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
          <h4>Update Property</h4>
        </div>
        <div className='mb-3'>
          <label htmlFor=''>Select Flat type</label>
          <select
            className='form-control form-control-sm'
            name='ftypeid'
            id='flattype'
            required
            onChange={(e) => {
              statMap.set(e.target.name, true);
              dispatch({
                type: 'addprop',
                field: e.target.name,
                val: e.target.value,
              });
            }}
          >
            <option defaultValue={oldProp.ftypeid}>{fType}</option>
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
              statMap.set(e.target.name, true);
              dispatch({
                type: 'addprop',
                field: e.target.name,
                val: e.target.value,
              });
            }}
          >
            <option defaultValue={oldProp.ptypeid}>{pType}</option>
          </select>
        </div>
        <div className='mb-3'>
          <input
            type='text'
            placeholder='Enter Price'
            className='form-control form-control-sm'
            name='price'
            id='price'
            defaultValue={oldProp.price}
            pattern='[0-9]{4,10}'
            title='Enter valid price'
            required
            onChange={(e) => {
              statMap.set(e.target.name, true);
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
            defaultValue={oldProp.address.addline1}
            placeholder='1234 Main St'
            required
            onChange={(e) => {
              statMap.set(e.target.name, true);
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
            defaultValue={oldProp.address.addline2}
            placeholder='Apartment, studio, or floor'
            onChange={(e) => {
              statMap.set(e.target.name, true);
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
                statMap.set(e.target.name, true);
                dispatch({
                  type: 'addprop',
                  field: e.target.name,
                  val: e.target.value,
                });
              }}
            >
              <option defaultValue={oldProp.address.state}>
                {oldProp.address.state}
              </option>
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
                defaultValue={oldProp.address.city}
                required
                onChange={(e) => {
                  statMap.set(e.target.name, true);
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
                defaultValue={oldProp.address.pincode}
                required
                onChange={(e) => {
                  statMap.set(e.target.name, true);
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
            updateprop(e);
          }}
        >
          Update Property
        </button>
      </form>
    </div>
  );
}
