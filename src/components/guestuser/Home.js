import React, { useEffect, useState } from 'react';
import '../customer/CustPropItem.scss';
import '../style.css';
import HomePropItem from './HomePropItem';

export default function CustHomepage() {
  const [search, setSearch] = useState();
  const [properties, setProperties] = useState([]);
  const [fTypes, setFTypes] = useState([]);
  const [pTypes, setPTypes] = useState([]);

  // const [propNums, setPropNums] = useState(0);

  // var reducer = (state, action) => {
  //   switch (action.type) {
  //     case 'checksearch':
  //       return { ...state, [action.field]: action.val };
  //   }
  // };
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
        // setPropNums(obj.length);
      })
      .catch((Error) => alert('server problem ! sever is down'));
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
        setProperties(obj);
        // setPropNums(obj.length);
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
  }, []);

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
      <div className='cust-prop-container'>
        {properties.map((property, i) => (
          <HomePropItem
            index={i}
            property={property}
            fType={fTypes.map((f) => f.ftypeid === property.ftypeid && f.ftype)}
            pType={pTypes.map((p) => p.ptypeid === property.ptypeid && p.ptype)}
          />
        ))}
      </div>
    </div>
  );
}
