import React, { useEffect, useState } from 'react';
import '../layout/PropItem.scss';
import { HiOutlineCurrencyRupee } from 'react-icons/hi';
import { FaUserFriends } from 'react-icons/fa';
import { BiCart } from 'react-icons/bi';
import { GoHome } from 'react-icons/go';
import { MdOutlineSell } from 'react-icons/md';
import { SlLocationPin } from 'react-icons/sl';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const CustPropItem = ({ index, myreq, wishlist, property, fType, pType }) => {
  var navigate = useNavigate();
  const myState = useSelector((state) => state.logged);

  const [reqStatusText, setReqStatusText] = useState('');
  const [wishStatusText, setWishStatusText] = useState('');
  const [ownerid, setOwnerid] = useState();

  useEffect(() => {
    // console.log(myreq);
    // console.log(property);
    var n = myreq.length;
    if (n == 0) {
      setReqStatusText('Request');
    } else {
      var flg = false;
      for (let v of myreq) {
        if (v.propid == property.pid) {
          setReqStatusText(v.status);
          setOwnerid(v.ownerid);
          flg = true;
          break;
        }
      }
      if (!flg) {
        setReqStatusText('Request');
      }
    }

    //
    console.log(wishlist);
    // console.log(property);
    var wishLength = wishlist.length;
    if (wishLength == 0) {
      setWishStatusText('Save');
    } else {
      var flg1 = false;
      for (let wi of wishlist) {
        if (wi.property.pid === property.pid) {
          setWishStatusText('Saved');
          flg1 = true;
          break;
        }
      }
      if (!flg1) {
        setWishStatusText('Save');
      }
    }
  }, [index, myreq, wishlist, property, fType, pType]);

  var sendReq = (e) => {
    e.preventDefault();
    var req = {
      buyerid: myState.userId,
      ownerid: property.userid,
      propid: property.pid,
      date: new Date(),
      status: 'Pending',
    };
    const options = {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(req),
    };
    fetch('http://localhost:8080/sendrequest', options)
      .then((res) => {
        if (res.ok) {
          setReqStatusText('Pending');
          console.log('Requeste sent Succesful...');
        }
      })
      .catch((err) => console.log(err));
  };

  var addToWishList = (e) => {
    e.preventDefault();
    var newWishItem = {
      buyerid: myState.userId,
      property: property,
    };
    const options = {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(newWishItem),
    };
    fetch('http://localhost:8080/addtowishlist', options)
      .then((res) => {
        if (res.ok) {
          setWishStatusText('Saved');
          console.log('Added to wishlist...');
        }
      })
      .catch((err) => console.log(err));
  };

  const getOwnerDetails = (e) => {
    // var ownerid = myreq.ownerid;
    fetch(`http://localhost:8080/getuser/${ownerid}`)
      .then((res) => res.json())
      .then((owner) => {
        console.log(owner);
        navigate('/getownercontact', { state: { owner } });
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className='prop-container'>
      <div className='prop-number'>
        <div id='circle'>{index + 1}</div>
      </div>
      <div className='prop-price'>
        <HiOutlineCurrencyRupee size={25} />
        <span>{property.price}</span>
      </div>
      <div className='prop-comm'>
        <div className='prop-comm-ftype'>
          <GoHome />
          <span>{fType}</span>
        </div>
        <div className='prop-comm-ptype'>
          <MdOutlineSell size={30} />
          <span>{pType}</span>
        </div>
      </div>
      <div className='prop-loc'>
        <SlLocationPin />
        <span>{property.address.city}</span>
      </div>
      <div className='prop-status'>{property.status}</div>
      <div className='prop-details-button'>
        <button
          style={{ fontSize: 13 }}
          disabled={
            (reqStatusText === 'Pending' && true) ||
            (reqStatusText === 'Accepted' && true)
          }
          onClick={(e) => {
            sendReq(e);
          }}
        >
          <FaUserFriends />
          {reqStatusText}
        </button>
        <button
          style={{ fontSize: 13 }}
          onClick={(e) => {
            addToWishList(e);
          }}
          disabled={wishStatusText === 'Saved' ? true : false}
        >
          <BiCart size={20} />
          {wishStatusText}
        </button>
      </div>
      {reqStatusText === 'Accepted' && (
        <div className='prop-details-button'>
          <button
            onClick={(e) => {
              getOwnerDetails(e);
            }}
          >
            Contact Owner
          </button>
        </div>
      )}
    </div>
  );
};

export default CustPropItem;
