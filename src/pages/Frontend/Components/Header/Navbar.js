import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../../context/Context'; 
import darkLogo from '../../../../Assets/black_logo.png';
import lightLogo from '../../../../Assets/white_logo.png';
import darkBar from '../../../../Assets/dark_bar.png';
import lightBar from '../../../../Assets/white_bar.png';
import darkUser from '../../../../Assets/dark_user.png';
import lightUser from '../../../../Assets/white_user.png'
import summerDark from '../../../../Assets/Crescent.png';
import summerLight from '../../../../Assets/sun.png';
import darkCart from '../../../../Assets/cartShopping_dark.png';
import lightCart from '../../../../Assets/cartShopping_light.png';
import darkLogout from '../../../../Assets/image.png';
import lightLogout from '../../../../Assets/logout.png'
import { Modal } from 'antd';
import { auth } from '../../../../config/firebase';

export default function Navbar({ mode, setMode }) {

  const { getTotalCartItems, isAuthenticated, setIsAuthenticated } = useContext(AuthContext); 
  const [menu, setMenu] = useState("home");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [showMenu, setShowMenu] = useState('');
  const navegate = useNavigate()

  const showModal =() => {
    setIsModalVisible(true)
  }

  const handleOk = async() => {
    try{
      await auth.signOut()
      setIsAuthenticated(false)
      setIsModalVisible(false)
      window.notify("You have been successfully logged out!",'success')
      navegate('/')
    }catch (error) {
      console.error("Error signing out: ", error);
    }
  }
  const handleCart = () =>{
    if(!isAuthenticated){
      window.notify("Please log in to view your cart!", 'error')
    }
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }
  const theme = () => {
    setMode(mode === 'light' ? 'dark' : 'light');
  };

  const barClicked = () => {
    setShowMenu(showMenu === '' ? 'show' : '');
  };

  return (
    <nav>
      {/* <a href="" className='logo'>
        <Link to='/'><img src={mode === 'light' ? darkLogo : lightLogo} alt="" /></Link>
      </a> */}
      <Link to='/' className='logo'>
         <img src={mode === 'light' ? darkLogo : lightLogo} alt="Logo" />
       </Link>
      <img onClick={barClicked} src={mode === 'light' ? darkBar : lightBar} id='bars' alt='img'/>
      <div className='all-icon-nav'>
        <div className={showMenu === 'show' ? "navbars show" : 'navbars'}>
          <div className='links'>
            <ul>
              <Link to='/'><li onClick={() => setMenu('home')}>Home{menu === 'home' ? <hr /> : <></>}</li></Link>
              <Link to='/men'><li onClick={() => setMenu('men')}>Men{menu === 'men' ? <hr /> : <></>}</li></Link>
              <Link to='/women'><li onClick={() => setMenu('women')}>Women{menu === 'women' ? <hr /> : <></>}</li></Link>
              <Link to='/contact'><li onClick={() => setMenu('contact')}>Contact{menu === 'contact' ? <hr /> : <></>}</li></Link>
            </ul>
          </div>
        </div>
        <div>
          {!isAuthenticated
          ? <Link to='/authentication/login'><img src={mode === 'light' ? darkUser : lightUser} alt='img' className='img' onClick={() => setMenu('')} /></Link>
          : <img src={mode==='light' ? darkLogout: lightLogout} alt="" className='img' onClick={showModal}/>
          }
         
          <img onClick={theme} src={mode === 'light' ? summerDark : summerLight} className='img' alt='img'/>
          <span className='crt'>
            <Link to='/cart'><img src={mode === 'light' ? darkCart : lightCart} onClick={handleCart} className='img cart' alt='img'/></Link>
            <div className='crt-bt'><p>{getTotalCartItems()}</p></div> {/* Show the total cart items */}
          </span>
        </div>
      </div>

      <Modal title="Confirm Logout"
      open={isModalVisible}
      onOk={handleOk}
      onCancel={handleCancel}
      okText="Confirm"
      cancelText="Cancel">
        <p>Are you sure you want to logout?</p>
      </Modal>
    </nav>
  );
}
