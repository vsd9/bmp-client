import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { MdDelete } from 'react-icons/md';
import { HiOutlineCurrencyRupee } from 'react-icons/hi';
import { GoHome } from 'react-icons/go';
import { RxCrossCircled } from 'react-icons/rx';
import { AiOutlineCheckCircle } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './PropertyPage.scss';

const PropertyPage = () => {
  const location = useLocation();
  // console.log(location.state.pType);

  var property = location.state.property;
  var index = location.state.index;
  var fType = location.state.fType;
  var pType = location.state.pType;

  // const myState = useSelector((state) => state.logged);

  const navigate = useNavigate();

  const [requests, setRequests] = useState();
  const [custs, setCusts] = useState([]);

  useEffect(() => {
    // Promise.all([
    //   fetch(`http://localhost:8080/getpropreq/${property.pid}`),
    //   fetch(`http://localhost:8080/getpropreq/${property.pid}`)
    // ])
    fetch(`http://localhost:8080/getpropreq/${property.pid}`)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((res) => {
        // console.log(res);
        setRequests(res);
        return res;
      })
      .then((res) => {
        // var temp = [];
        const fetchData = async (r) => {
          const response = await fetch(
            // `http://localhost:8080/getusername/${r.buyerid}`
            `http://localhost:8080/getuser/${r.buyerid}`
          );
          const newData = await response.json();
          setCusts((custs) => [...custs, newData]);
          // temp.push(newData);
        };
        res.forEach((r) => {
          // fetch(`http://localhost:8080/getusername/${r.buyerid}`)
          //   .then((res) => {
          //     if (res.ok) {
          //       return res.json();
          //     }
          //   })
          //   .then((res) => {
          //     // console.log(res);
          //     temp.push(res);
          //   })
          //   .catch((e) => {
          //     console.log(e);
          //   });
          fetchData(r);
        });
        // console.log(temp);
        // setCusts(temp);
        // console.log(custs);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  var handleFeedbacks = (e) => {
    e.preventDefault();
  };

  var handleRequests = (e) => {
    e.preventDefault();
  };

  var handleDeleteProp = (e) => {
    e.preventDefault();

    const options = {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(property),
    };
    fetch('http://localhost:8080/deleteproperty', options)
      .then((res) => res.json)
      .then((msg) => {
        console.log(msg);
        navigate('/myproperties');
      });
  };
  var handleUpdateProp = (e) => {
    e.preventDefault();
    navigate('/updateprop', { state: { index, property, fType, pType } });
  };

  const handleAcceptRequest = (e, cust) => {
    e.preventDefault();
    var reqid = 0;
    var curReq = {};
    requests.forEach((r) => {
      if (r.buyerid == cust.userid) {
        reqid = r.reqid;
        curReq = r;
      }
    });
    fetch(`http://localhost:8080/updatereq/${reqid}`)
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        navigate('/dealpage', { state: { cust, curReq } });
      })
      .catch((err) => console.log(err));
  };

  const handleRejectRequest = (e) => {};

  return (
    <div className='prop-page-container'>
      <div className='prop-page'>
        <div className='prop-header'>
          <div className='prop-number'>
            <div id='circle'>{1}</div>
          </div>
          <div className='prop-button'>
            <button
              type='button'
              className='btn btn-outline-danger'
              onClick={(e) => {
                handleDeleteProp(e);
              }}
            >
              <MdDelete size={25} />
            </button>
            <button
              type='button'
              className='btn btn-outline-info'
              onClick={(e) => {
                handleUpdateProp(e);
              }}
            >
              Update
            </button>
          </div>
        </div>
        <div className='prop-price'>
          <HiOutlineCurrencyRupee size={35} />
          <span>{location.state.property.price}</span>
        </div>
        <div className='prop-ptyp-status'>
          <span className='badge text-bg-primary'>{location.state.pType}</span>
          <span className='badge text-bg-warning'>
            {location.state.property.s_status}
            {/* Not Dealed */}
          </span>
        </div>
        <div className='prop-address'>
          <h6>
            <u>Address:</u>
          </h6>
          <span>{location.state.property.address.addline1}, </span>
          <span>{location.state.property.address.city}, </span>
          <span>{location.state.property.address.state}</span>
        </div>
        <div className='prop-ftype'>
          <GoHome size={30} />
          <span>{location.state.fType}</span>
        </div>
        {property.s_status === 'Not Dealed' && (
          <div className='prop-requests'>
            <button type='button' class='btn btn-dark'>
              Request <span class='badge badge-dark'>{custs.length}</span>
            </button>
            <ul className='list-group'>
              {custs.map((v) => (
                <li className='list-group-item'>
                  <div className='cust-name'>
                    <span>
                      {v.fname} {v.lname}
                    </span>
                    {/* {console.log(v[0] + ' ' + v[1])} */}
                  </div>
                  <div className='req-btns'>
                    <button
                      type='button'
                      class='btn btn-outline-success'
                      onClick={(e) => {
                        handleAcceptRequest(e, v);
                      }}
                    >
                      <AiOutlineCheckCircle className='req-acc' size={20} />
                      Accept
                    </button>
                    <button
                      type='button'
                      class='btn btn-outline-danger'
                      onClick={(e) => {
                        handleRejectRequest(e);
                      }}
                    >
                      <RxCrossCircled className='req-rej' size={20} />
                      Reject
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* <div className='prop-feedbacks'>
          <button
            type='button'
            className='btn btn-secondary'
            onClick={(e) => {
              handleFeedbacks(e);
            }}
            disabled
          >
            Feedbacks <span className='badge badge-light'>4</span>
          </button>
          <ul className='list-group'>
            <li className='list-group-item'>
              <span className='cust-name'>Utkarsh Pawar</span>
              <div className='requ-butts'>Hello</div>
            </li>
            <li className='list-group-item'>Dapibus ac facilisis in</li>
            <li className='list-group-item'>Morbi leo risus</li>
            <li className='list-group-item'>Porta ac consectetur ac</li>
            <li className='list-group-item'>Vestibulum at eros</li>
          </ul>
        </div> */}
      </div>
    </div>
  );
};

export default PropertyPage;
