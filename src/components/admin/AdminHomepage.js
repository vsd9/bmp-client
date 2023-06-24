import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
export default function AdminHomepage() {
  const [ownersproperty, setownersproperty] = useState([]);
  const [flattype, setflattype] = useState([]);
  const [propertytype, setproptype] = useState([]);
  const [search, setSearch] = useState();
  const [validatestatus, setValidateStatus] = useState('verify');
  const navigate = useNavigate();

  var reducer = (state, action) => {
    switch (action.type) {
      case 'checksearch':
        return { ...state, [action.field]: action.val };
    }
  };
  var checksearch = (s) => {
    s.preventDefault();
    fetch(`http://localhost:8080/search/${search}`)
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error('server Error');
        }
      })
      .then((obj) => {
        console.log(obj);
        setownersproperty(obj);
      })
      .catch((Error) => alert('server problem ! sever is down'));
  };

  var handleValidate = (e, id) => {
    e.preventDefault();
    fetch(`http://localhost:8080/validateproperty/${id}`)
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
    fetch('http://localhost:8080/getproperty')
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error('server Error');
        }
      })
      .then((obj) => {
        //    if(obj.pid===)
        console.log(obj);
        setownersproperty(obj);
      })
      .catch((Error) => alert('server problem ! sever is down'));

    fetch('http://localhost:8080/getflattype')
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error('server Error');
        }
      })
      .then((obj) => {
        console.log(obj);
        setflattype(obj);
      })
      .catch((Error) => alert('server problem ! sever is down1'));

    fetch('http://localhost:8080/getproptype')
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error('server Error');
        }
      })
      .then((obj) => {
        console.log(obj);
        setproptype(obj);
      })
      .catch((Error) => alert('server problem ! sever is down2'));
  }, []);

  const gotouservalidate = (e) => {
    navigate('/uservalidate');
  };
  return (
    <div>
      {/* <div>
                    <input type="button" value="Validate User"
                    onClick={(e)=> gotouservalidate(e)}/>
                    
                </div>
            <label for="search"><b>Property Search:</b></label>
            <input type="search" id="search" name="search"
                onChange={(e) => setSearch(e.target.value)} />
            <input type="submit" value="search" className="btn btn-primary" placeholder="search by location"
                onClick={(s) => { checksearch(s) }} />
             */}
      <div className='form-container'>
        <h3>
          <i>Welcome Admin</i>
        </h3>
        <div className='login-form'>
          <div className='form'>
            <h3>
              <i>Property Details</i>
            </h3>
            <form>
              <div className='input-container'>
                <table className='table'>
                  <thead>
                    <tr>
                      <th scope='co1'>Price</th>
                      <th scope='co1'>Status</th>
                      <th scope='co1'>Address</th>
                      <th scope='co1'>City</th>
                      <th scope='co1'>Pincode</th>
                      <th scope='co1'>State</th>
                      <th scope='co1'>Flat Type</th>
                      <th scope='co1'>Property Type</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ownersproperty.map((e) => {
                      return (
                        <tr>
                          <td>{e.price}</td>
                          <td>{e.status}</td>
                          <td>{e.address.addline1}</td>
                          <td>{e.address.city}</td>
                          <td>{e.address.pincode}</td>
                          <td>{e.address.state}</td>

                          {flattype.map((f) => {
                            return (
                              f.ftypeid === e.ftypeid && <td>{f.ftype}</td>
                            );
                          })}
                          {propertytype.map((p) => {
                            return (
                              p.ptypeid === e.ptypeid && <td>{p.ptype}</td>
                            );
                          })}
                          <td>
                            <div>
                              <button
                                onClick={(f) => handleValidate(f, e.pid)}
                                disabled={e.status === 'Verified'}
                              >
                                {console.log(e.status)}
                                {e.status === '' ? 'Verify' : 'Verified'}
                                {/* verify */}
                              </button>
                            </div>
                          </td>
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
    </div>
  );
}
