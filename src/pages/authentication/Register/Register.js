import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import {auth, firestore} from '../../../config/firebase'
import { doc, setDoc } from 'firebase/firestore';

const initialState = {firstName: '', lastName: '', email: '', password: ''}

export default function Register() {

  const [isProcessing, setIsProcessing] = useState(false);
  const [state, setState] = useState(initialState)
  const navegate = useNavigate()

  const handleChange = e => {
    setState(state => ({...state,[e.target.name]: e.target.value}))
  }
  const handleRegister = e => {
    e.preventDefault()

    let {firstName, lastName, email, password} = state
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    firstName = firstName.trim()
    lastName = lastName.trim()
    email = email.trim()
    password = password.trim()

    if(firstName.length < 3){
      window.notify("Please enter your first name", 'error')
      return
    }
    if(lastName.length < 3){
      window.notify("Please enter your last name", 'error')
      return
    }
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
    }

    setIsProcessing(true)
    createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => { 
    const user = userCredential.user;
    addDocument(user)
    window.notify("account created successfull", 'success')
    console.log('user created')
    setIsProcessing(false)
    navegate('/authentication/login')
  })
  .catch((err) => {
    console.log(err)
      window.notify("Something went wrong, user not created", 'error')
  });
  }

  const addDocument = async(user) => {
    try{
      await setDoc(doc(firestore, 'users', user.uid),{
        email:'',
        password:'',
        uid: user.uid
      })

    }
    catch(err){
      console.error(err)
    }
    setIsProcessing(false)
  }
  return (
    <div className='login-signup'>
      <div className="signup-reges">
        <h1>Register</h1>
        <p>Register now and get full access to our app.</p>
        <form onSubmit={handleRegister}>
          <span className="input-span">
            <input type="text" placeholder="First Name" name='firstName' onChange={handleChange} />
            <input type="text" placeholder="Last Name" name='lastName'  onChange={handleChange}/>
          </span>
          <br />
          <input type="email" placeholder="E-mail" name='email'  onChange={handleChange}/> <br />
          <input type="password" placeholder="Password" name='password'  onChange={handleChange}/> <br />
          {
          !isProcessing
          ? <input type="submit" value="Submit"/>
          : <div className='loder'><div className='spinner-grow'></div></div>
        } 
        <br />
        </form>
        <p className="qution">
          Already have an account?
          <Link to='/authentication/login'><span> Login</span></Link>
        </p>
      </div>
    </div>
  )
}
