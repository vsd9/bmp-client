import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from './slice';

import React from 'react';

const Logout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  dispatch(logout());
  navigate('/home');
};

export default Logout;
