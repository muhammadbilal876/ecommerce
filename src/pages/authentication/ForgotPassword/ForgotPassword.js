import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
const initialState = { email: '' };

export default function ForgotPassword() {

  const [state, setState] = useState(initialState);
  const [isProcessing, setIsProcessing] = useState(false);
  
  const handleChange = e => {
    setState(state => ({...state,[e.target.name]: e.target.value}))
  }
  const handleForgot = async(e) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const { email } = state;

    if (!email) {
      window.notify("Please enter your email", 'error');
      return;
    }
    if(!emailRegex.test(email)){
      window.notify("Please enter a valid email address", 'error');
    return;
    }

    setIsProcessing(true);
    const auth = getAuth();
    sendPasswordResetEmail(auth, email)
  .then(() => {
    window.notify('Password reset email sent!','success')
    setIsProcessing(false)
  })
  .catch((error) => {
    window.notify("email not found",'error')
  });
  
  }


  

  return (
    <div className='login-signup'>
      <div className="signup-reges">
        <h1>Welcome back</h1>
        <p>Reset your password to secure your account.</p>
        <form onSubmit={handleForgot}>
          <input 
            type="email" 
            placeholder="E-mail" 
            name='email' 
            onChange={handleChange} 
          /> <br />
          {
            !isProcessing
            ? <input type="submit" value="Submit"/>
            : <div className='loder'><div className='spinner-grow'></div></div>
          } 
          <br />
        </form>
        <p className="question">
          Remember my password? 
          <Link to='/authentication/login'><span> Login Now</span></Link>
        </p>
      </div>
    </div>
  )
}
