import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function OwnerHomepage() {
  const navigate = useNavigate();

  const navigateToaddproperty = () => {
    navigate('/addproperty');
  };

  const navigateshowproperty = () => {
    navigate('/myproperties');
  };
  return (
    <div>
      {/* <h3><i>Manage Property</i></h3>
      <input type="button" value="Add Property"
        onClick={navigateToaddproperty} /><br />
      <input type="button" value="Show Properties"
        onClick={navigateshowproperty} /> */}
    </div>
  );
}
