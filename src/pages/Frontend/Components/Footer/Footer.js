import React from 'react'
import lightLogo from '../../../../Assets/white_logo.png'
import darkLogo from '../../../../Assets/black_logo.png'
import payment from '../../../../Assets/payment.png'
import message from '../../../../Assets/message.png'

export default function Footer({mode}) {
  return (
    <footer>
      <div className="logo-footer">
        <img src={mode==='light'?lightLogo:darkLogo} alt="" />
        <p>The customer is at the heart of our unique business model, which includes design.</p>
        <img src={payment} alt="" />
      </div>
      <div className="shop-link">
        <h1>SHOPPING</h1>
        <a href="#">Contact Us</a>
        <a href="#">Payment Methods</a>
      <a href="#">Delivary</a>
      <a href="#">Return & Exchanges</a>
      </div>
      <div className="desc">
      <h1>NEW LETTER</h1>
      <p>Be the first know about new arrivals,
        look books, sales & personal</p>
        <div className="input">
          <input type="email"  placeholder='Your E-mail' />
          <img src={message} alt="" />
        </div>
      </div>
    </footer>
  )
}
