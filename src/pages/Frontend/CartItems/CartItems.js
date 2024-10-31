import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../context/Context'
import lightCloud from '../../../Assets/close.png';
import darkCloud from '../../../Assets/darkClose.png';
import { Drawer } from 'antd';
import { firestore } from '../../../config/firebase';
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';

const initialState = {email:'',cardNumber:'', expiry:'', cvc:'', cardName:'', country:''}

export default function CartItems({mode}) {

    const{ allProduct, removeFromCart, cartItem, user, clearCart } = useContext(AuthContext)
    const [state, setState] = useState(initialState)
    const [isProcessing, setIsProcessing] = useState(false);
    const [open, setOpen] = useState(false);
    const totalItemsInCart = Object.values(cartItem).reduce((total, count) => total + count, 0);

    const showDrawer = () => {
        setOpen(true);
      };
      const onClose = () => {
        setOpen(false);
      };
      
    const handleChange = (e) => {
    setState((state) => ({ ...state, [e.target.name]: e.target.value }));
    }

    const handleSubmit = async(e) => {
      e.preventDefault()

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      let { email, cardNumber, expiry, cvc, cardName, country } = state

    email = email.trim()
    cardNumber = cardNumber.trim()
    expiry = expiry.trim()
    cvc = cvc.trim()
    cardName = cardName.trim()
    country = country.trim()

    if(!email){
      window.notify("Please enter your email", 'error')
      return
    }
    if(!emailRegex.test(email)){
      window.notify("Please enter a valid email address", 'error');
    return;
    }
    if(cardNumber.length < 11){
      window.notify("Please enter your cardNumber corectly", 'error')
      return
    }
    if(!expiry){
      window.notify("Please enter card expiry date", 'error')
      return
    }
    if(cvc.length < 3){
      window.notify("Please enter card cvc number", 'error')
      return
    }
    if(!cardName){
      window.notify("Please enter your card name", 'error')
      return
    }
    if(!country){
      window.notify("Please select your country or region", 'error')
      return
    }
    let orderData = {email, cardNumber, expiry, cvc, cardName, country}
    orderData.dateCreated = serverTimestamp()
    orderData.id = window.getRandomId()
    orderData.status = 'active'
    orderData.createdBy = {
      email: user.email,
      uid: user.uid
    }
    createADocument(orderData)
    }

    const createADocument = async(orderData) => {

      setIsProcessing(true)
      try{
        await setDoc(doc(firestore, "orders", orderData.id), orderData); 
        
        window.notify("Your order has been confirmed successfull", "success")
        
        
              // Clear the cart
              clearCart();
  
              // Reset the form fields
              setState(initialState);
  
              // Close the drawer
              setOpen(false);
  
      }catch(err){
        console.error(err)
        window.notify("Something went wrong, the order was not processed", "error");
      }
      setIsProcessing(false)
    }
  return (
    <>
    <div className='cart-items'>
      <h1>Your Cart Items</h1>
      {totalItemsInCart === 0 ? (
        <div className='empty'>
          <h2 className='empty-text'>Your Cart is <span>Empty!</span></h2>
          <p className='empty-description'>Must Add items on the cart before you proceed to check out.</p>
          <Link to='/'><button>RETURN TO SHOP</button></Link>
        </div>
      ) : (
        <>
          <div className="cart-items-format-main">
            <p>Products</p>
            <p>Title</p>
            <p>Price</p>
            <p>Quantity</p>
            <p>Total</p>
            <p>Remove</p>
          </div>
          <hr />
          {allProduct.map((e) => {
            if (cartItem[e.id] > 0) {
              return (
                <div key={e.id}>
                  <div className="cart-items-format">
                    <img src={e.image} alt="" className='prpimg' />
                    <p>{e.name}</p>
                    <p>${e.newPrice}</p>
                    <button className='count'>{cartItem[e.id]}</button>
                    <p className='priced'>${e.newPrice * cartItem[e.id]}</p>
                    <img 
                      src={mode === 'dark' ? lightCloud : darkCloud} 
                      alt="" 
                      className='closed' 
                      onClick={() => removeFromCart(e.id)} 
                    />
                  </div>
                  <hr />
                </div>
              );
            }
            return null;
          })}
          <div className="cart_total">
            <div className="total">
              <span>
                <h5>Subtotal</h5>
                <h5>{0}$</h5>
              </span>
              <span>
                <h5>Shipping Free</h5>
                <h5>Free</h5>
              </span>
              <span>
                <h5>Total</h5>
                <h5>{0}$</h5>
              </span>
              <hr />
              <button onClick={showDrawer}>PROCEED TO CHECKOUT</button>
            </div>
            <div className="code-promo">
              <p>If you have a promo code, Enter it here.</p>
              <div className="promo-code-input">
                <input type="number" className='promo-code' />
                <button>Submit</button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
    {/* checkout method  */}
    <div className='model'>
        <Drawer title="Checkout" onClose={onClose} open={open}>
          <div className="payment-form">
            <button className="apple-pay-btn">Pay</button>
            <p className="divider">Or pay with card</p>

            <form onSubmit={handleSubmit}>
              <label htmlFor="email">Email</label>
              <input type="email" id="email" name="email" onChange={handleChange}/>

              <label htmlFor="card-info">Card information</label>
              <div className="card-input">
                <input type="number" id="card-info" name="cardNumber" placeholder="1234 1234 1234 1234" onChange={handleChange} />
              </div>
              <div className="card-details">
                <input type="number" id="card-expiry" name="expiry" placeholder="MM / YY" onChange={handleChange} />
                <input type="number" id="card-cvc" name="cvc" placeholder="CVC" onChange={handleChange} />
              </div>

              <label htmlFor="name-on-card">Name on card</label>
              <input type="text" id="name-on-card" name="cardName" onChange={handleChange} />

              <label htmlFor="country">Country or region</label>
              <select id="country" name="country" onChange={handleChange}>
                <option value="United States">United States</option>
                <option value="Canada">Canada</option>
                <option value="Canada">Australia</option>
                <option value="Canada">United Kingdom</option>
                <option value="Canada">New Zealand</option>
              </select>
              {
                !isProcessing
                ? <button type="submit" className="pay-btn">Pay</button>
                : <div className='loder'><div className='spinner-grow'></div></div>
              }     
            </form>
          </div>
        </Drawer>
      </div>
    </>
  )
}
