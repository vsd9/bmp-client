import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

export default function MyRequests() {
  const myState = useSelector((state) => state.logged);
  const [isRequestSent, setIsRequestSent] = useState(false);
  const [remove, removeFromWishlist] = useState(false);

  const [wishlist, setwishlist] = useState([]);

  const handleSendRequest = () => {
    setIsRequestSent(true);
  };

  // const handleRemoveWish = () => {
  //     removeFromWishlist(true);
  // };

  var handleRemoveWish = (e, id) => {
    e.preventDefault();
    // const options = {
    //   method: 'POST',
    //   headers: {
    //     'content-type': 'application/json',
    //   },
    //   body: JSON.stringify(wishlist),
    // };
    fetch(`http://localhost:8080/deletewish/${id}`)
      .then((res) => {
        if (res.ok) {
          //navigate('/');
        }
      })

      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetch(`http://localhost:8080/getmyrequest/${myState.userId}`)
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
        <h3>
          <i>Welcome Customer</i>
        </h3>
        <div className='login-form'>
          <div className='form'>
            <h3>
              <i>WishList Details</i>
            </h3>
            <br />
            <form>
              <div className='input-container'>
                <table className='table'>
                  <thead>
                    <tr>
                      <th scope='co1'>Flat Type</th>
                      <th scope='co1'>Property Price</th>
                      <th scope='co1'>Property Type</th>
                      <th scope='co1'>Status</th>
                      <th scope='co1'>Property City</th>
                      <th scope='co1'>Property State</th>
                      <th scope='co1'>Property Pincode</th>
                    </tr>
                  </thead>
                  <tbody>
                    {wishlist.map((e) => {
                      return (
                        <tr>
                          <td>{e.property.ftypeid}</td>
                          <td>{e.property.price}</td>
                          <td>{e.property.ptypeid}</td>
                          <td>{e.property.status}</td>
                          <td>{e.property.address.city}</td>
                          <td>{e.property.address.state}</td>
                          <td>{e.property.address.pincode}</td>

                          <div>
                            <input
                              type='button'
                              onClick={(f) => handleRemoveWish(f, e.wishid)}
                              value='Remove From Wishlist'
                            />
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
    </div>
  );
}
