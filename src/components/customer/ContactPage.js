import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import '../pages/DealPage.scss';

const ContactPage = () => {
  // const location = useLocation();
  // var myreq = location.state.myreq;
  // const [owner, setOwner] = useState();
  const { state } = useLocation();
  const { owner } = state || [];

  // useEffect(() => {
  //   const fetchData = async (r) => {
  //     const response = await fetch(`http://localhost:8080/getuser/${r}`);
  //     const newData = await response.json();
  //     // setCusts((custs) => [...custs, newData]);
  //     console.log(newData);
  //     setOwner(newData);
  //     // temp.push(newData);
  //   };
  //   fetchData(myreq.ownerid);
  // }, [myreq]);

  return (
    <div className='deal-container'>
      <h4>Owner Details</h4>
      <div className=''>
        <h6>
          Name:{owner.fname} {owner.lname}
        </h6>
        <h6>Contact Number: {owner.contact} </h6>
        <h6>Email: {owner.email} </h6>
        <h6>City: {owner.address.city} </h6>
      </div>
    </div>
  );
};

export default ContactPage;
