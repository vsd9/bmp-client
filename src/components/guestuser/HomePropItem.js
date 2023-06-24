import '../layout/PropItem.scss';
import { HiOutlineCurrencyRupee } from 'react-icons/hi';
import { GoHome } from 'react-icons/go';
import { MdOutlineSell } from 'react-icons/md';
import { SlLocationPin } from 'react-icons/sl';

const HomePropItem = ({ index, property, fType, pType }) => {
  

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
    </div>
  );
};

export default HomePropItem;
