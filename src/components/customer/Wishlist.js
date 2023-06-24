import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function Wishlist() {
  const myState = useSelector((state) => state.logged);
  const [isRequestSent, setIsRequestSent] = useState(false);
  const [remove, removeFromWishlist] = useState(false);

  const [wishlist, setwishlist] = useState([]);

  const navigate = useNavigate();

  const handleSendRequest = () => {
    setIsRequestSent(true);
  };

  var handleRemoveWish = (e, id) => {
    e.preventDefault();
    fetch(`http://localhost:8080/deletewish/${id}`)
      .then((res) => {
        if (res.ok) {
          navigate('/mywishlist');
        }
      })

      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetch(`http://localhost:8080/getmywishlist/${myState.userId}`)
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error('server Error');
        }
      })
      .then((res) => {
        console.log(res);
        setwishlist(res);
      });
  }, []);

  return (
    <div>
      <div className='form-container'>
        <div className='login-form'>
          <div className='form'>
            <h3>
              <i>My WishList</i>
            </h3>
            <br />
            <form>
              <div className='input-container'>
                <table className='table'>
                  <thead>
                    <tr>
                      {/* <th scope='co1'>Flat Type</th> */}
                      <td scope='co1'>No.</td>
                      <th scope='co1'> City</th>
                      <th scope='co1'> Price</th>
                      {/* <th scope='co1'>Property Type</th> */}
                      {/* <th scope='co1'>Status</th> */}

                      <th scope='co1'> State</th>
                      {/* <th scope='co1'> Pincode</th> */}
                    </tr>
                  </thead>
                  <tbody>
                    {wishlist.map((e, i) => {
                      return (
                        <tr>
                          {/* <td>{e.property.ftypeid}</td> */}
                          <td>{i + 1}</td>
                          <td>{e.property.address.city}</td>
                          <td>{e.property.price}</td>
                          {/* <td>{e.property.ptypeid}</td> */}
                          {/* <td>{e.property.status}</td> */}

                          <td>{e.property.address.state}</td>
                          {/* <td>{e.property.address.pincode}</td> */}
                          <td>
                            <div>
                              <input
                                type='button'
                                onClick={(f) => handleRemoveWish(f, e.wishid)}
                                value='Remove'
                              />
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
