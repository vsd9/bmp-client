import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import './CustPropItem.scss';
import '../style.css';
import CustPropItem from './CustPropItem';

export default function CustHomepage() {
  const [search, setSearch] = useState();
  const [properties, setProperties] = useState([]);
  const [fTypes, setFTypes] = useState([]);
  const [pTypes, setPTypes] = useState([]);
  const [custRequests, setCustRequests] = useState([]);
  const [wishList, setWishList] = useState([]);
  const myState = useSelector((state) => state.logged);

  const navigate = useNavigate();
  const [isRequestSent, setIsRequestSent] = useState(false);
  const [added, addToWishlist] = useState(false);
  const [propNums, setPropNums] = useState(0);
  //   var propListLen=ownersproperty.length;

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
        setProperties(obj);
        setPropNums(obj.length);
      })
      .catch((Error) => alert('server problem ! sever is down'));
  };

  const handleSendRequest = () => {
    setIsRequestSent(true);
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
        // console.log(obj);
        setProperties(obj);
        setPropNums(obj.length);
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
        // console.log(obj);
        setFTypes(obj);
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
        // console.log(obj);
        setPTypes(obj);
      })
      .catch((Error) => alert('server problem ! sever is down2'));

    fetch(`http://localhost:8080/getmyrequest/${myState.userId}`)
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error('server Error');
        }
      })
      .then((res) => {
        // console.log(res);
        setCustRequests(res);
      })
      .catch((Error) => alert('server problem ! sever is down2'));

    fetch(`http://localhost:8080/getmywishlist/${myState.userId}`)
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error('server Error');
        }
      })
      .then((res) => {
        // console.log(res);
        setWishList(res);
      })
      .catch((Error) => alert('server problem ! sever is down 4'));
  }, []);

  var calcStat = (property) => {
    custRequests.forEach((v) => {
      //   console.log(v.status);
      if (v.propid === property.pid) {
        return v.status;
      }
    });
    return 'Send Request';
  };

  return (
    <div className='cust-home-container'>
      <div className='search-container'>
        <form class='form-inline search-form'>
          <div className='search-btn'>
            <input
              class='form-control mr-sm-2'
              type='search'
              placeholder='Enter city'
              aria-label='Search'
              onChange={(e) => setSearch(e.target.value)}
            />
            <button
              class='btn btn-outline-primary '
              type='submit'
              onClick={(s) => {
                checksearch(s);
              }}
            >
              Search
            </button>
          </div>
        </form>
      </div>
      <div className='hr-line1'></div>
      {/* <div className='cust-nav-buttons'>
        <button type='button' class='btn btn-outline-secondary'>
          <Link className='nav-link' to='/'>
            My Requests
          </Link>
        </button>
        <button type='button' class='btn btn-outline-secondary'>
          <Link className='nav-link' to='/'>
            Wishlist
          </Link>
        </button>
      </div> */}
      <div className='cust-prop-container'>
        {properties.map((property, i) => (
          <CustPropItem
            index={i}
            // reqstatus={custRequests.map((r) =>
            //   r.propid === property.pid ? r.status : "Send Request"
            // )}
            myreq={custRequests}
            wishlist={wishList}
            property={property}
            fType={fTypes.map((f) => f.ftypeid === property.ftypeid && f.ftype)}
            pType={pTypes.map((p) => p.ptypeid === property.ptypeid && p.ptype)}
          />
        ))}
      </div>
    </div>
  );
}
