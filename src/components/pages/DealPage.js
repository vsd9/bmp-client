import React from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './DealPage.scss';

const DealPage = () => {
  const location = useLocation();
  var customer = location.state.cust;
  var curReq = location.state.curReq;
  var navigate=useNavigate();

  const handleConfirmDeal=(e)=>{
    e.preventDefault();
    const deal={
      buyerid:curReq.buyerid,
      ownerid:curReq.ownerid,
      reqid:curReq.reqid,
      propid:curReq.propid,
      date:new Date(),
      status:"dealed"
    }

    const options = {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(deal),
    };
    fetch('http://localhost:8080/makedeal', options)
      .then((res) => res.json)
      .then((msg) => {
        console.log(msg);
        navigate('/myproperties');
      });
  }

  return (
    <div className='deal-container'>
      <h4>Customer Details</h4>
      <div className=''>
        <h6>
          Name:{customer.fname} {customer.lname}
        </h6>
        <h6>Contact Number: {customer.contact} </h6>
        <h6>Email: {customer.email} </h6>
        <h6>City: {customer.address.city} </h6>
      </div>
      <button type='button' class='btn btn-outline-success' onClick={(e) => {
        handleConfirmDeal(e)
      }}>
        Confirm Deal
      </button>
    </div>
  );
};

export default DealPage;
