import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
} from 'react-router-dom';
import './App.scss';
import { useSelector } from 'react-redux';
import Navbar from './components/layout/Navbar';
import Login from './components/Login';
import Signup from './components/Signup';
import Home from './components/guestuser/Home';
import CustHomepage from './components/customer/CustHomepage';
import OwnerHomepage from './components/owner/OwnerHomepage';
import AdminHomepage from './components/admin/AdminHomepage';
import Logout from './components/Logout';
import AddProperty from './components/owner/AddProperty';
import OwnerProperties from './components/owner/OwnerProperties';
import PropertyPage from './components/pages/PropertyPage';
import UpdateProp from './components/owner/UpdateProp';
import Wishlist from './components/customer/Wishlist';
import UserValidate from './components/admin/UserValidate';
import DealPage from './components/pages/DealPage';
import { useLocation } from 'react-router-dom';
import ContactPage from './components/customer/ContactPage';
// import { redirect } from 'react-router-dom';

function App() {
  const myState = useSelector((state) => state.logged);
  // const location = useLocation();
  return (
    <Router>
      <div className='App'>
        <Navbar />
        <div className='container'>
          {/* {console.log(location.pathname)} */}
          {/* {myState.loggedIn === false && <Home />} */}
          <Routes>
            <Route exact path='/login' element={<Login />}></Route>
            <Route exact path='/signup' element={<Signup />}></Route>
            <Route
              exact
              path='/CustHomepage'
              element={<CustHomepage />}
            ></Route>
            <Route
              exact
              path='/OwnerHomepage'
              element={<OwnerHomepage />}
            ></Route>
            <Route
              exact
              path='/AdminHomepage'
              element={<AdminHomepage />}
            ></Route>
            <Route exact path='/logout' element={<Logout />}></Route>
            <Route exact path='/addproperty' element={<AddProperty />}></Route>
            <Route
              exact
              path='/myproperties'
              element={<OwnerProperties />}
            ></Route>
            <Route
              exact
              path='/propertypage'
              element={<PropertyPage />}
            ></Route>
            <Route exact path='/updateprop' element={<UpdateProp />}></Route>
            <Route exact path='/mywishlist' element={<Wishlist />}></Route>
            <Route
              exact
              path='/uservalidate'
              element={<UserValidate />}
            ></Route>
            <Route
              exact
              path='/propertyvalidate'
              element={<AdminHomepage />}
            ></Route>
            <Route exact path='/dealpage' element={<DealPage />}></Route>
            <Route exact path='/home' element={<Home />}></Route>
            <Route exact path='/' element={<Home />}></Route>
            <Route
              exact
              path='/getownercontact'
              element={<ContactPage />}
            ></Route>
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
