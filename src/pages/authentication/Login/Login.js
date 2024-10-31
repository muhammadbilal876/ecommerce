import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { signInWithEmailAndPassword } from 'firebase/auth'; 
import { auth } from '../../../config/firebase';
import { AuthContext } from '../../../context/Context';

const initialState = {email:'', password:''}
export default function Login() {

  const {setIsAuthenticated} = useContext(AuthContext)
  const [isProcessing, setIsProcessing] = useState(false);
  const [state, setState] = useState(initialState)
  const navegate = useNavigate()

  const handleChange = e => {
    setState(state => ({...state,[e.target.name]: e.target.value}))
  }
  const handleLogin = e => {
    e.preventDefault()

    let {email, password} = state
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    email = email.trim()
    password = password.trim()

    if(!email){
      window.notify("Please enter your email address", 'error')
      return
    }
    if(!emailRegex.test(email)){
      window.notify("Please enter a valid email address", 'error');
    return;
    }
    if(password.length < 6){
      window.notify("Please enter your password correctly", 'error')
      return
    }
    setIsProcessing(true)
    signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    const user = userCredential.user;
    console.log(user)
    window.notify("Login successful", 'success');
    setIsAuthenticated(true)
    navegate('/');
  })
  .catch((err) => {
    if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password') {
      window.notify("Incorrect email or password", 'error');
    } else {
      window.notify("Incorrect email or password.", 'error');
    }
  })
  .finally(() => {
    setIsProcessing(false);
  });
  }
  return (
    <>
    <div className='login-signup'>
      <div className="signup-reges">
        <h1>Login</h1>
        <p>Login now and get full access to our app.</p>
        <form onSubmit={handleLogin}>
          <input 
            type="email" 
            name="email" 
            placeholder="E-mail" 
            onChange={handleChange} 
          /> <br />
          <input 
            type="password" 
            name="password" 
            placeholder="Password" 
            onChange={handleChange} 
          /> <br />
          <p className='question' style={{ textAlign: 'left' }}>
            <Link to='/authentication/forget-password'><span>Forgot Password?</span></Link>
          </p>
          {
          !isProcessing
          ? <input type="submit" value="Submit"/>
          : <div className='loder'><div className='spinner-grow'></div></div>
        } 
          <br />
        </form>
        <p className="">
          Don't have an account?
          <Link to='/authentication/register'><span> Register Now</span></Link>
        </p>
      </div>
    </div>
    </>
  )
}
