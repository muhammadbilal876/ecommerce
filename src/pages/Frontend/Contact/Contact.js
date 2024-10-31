import React, { useState } from 'react';
import '../../../scss/contact/_contact.css';
import { doc, setDoc } from 'firebase/firestore';
import { firestore } from '../../../config/firebase';

const initialState = { email: '', description: '' };

const Contact = () => {
  const [state, setState] = useState(initialState);

  const handleChange = (e) => {
    setState((s) => ({ ...s, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let { email, description } = state;

    email = email.trim();
    description = description.trim();

    if (!email) {
      window.notify('Please enter your email address', 'error');
      return;
    }
    if (description.length < 10) {
      window.notify('Please enter your description.', 'error');
      return;
    }

    let contact = { email, description };
    contact.id = window.getRandomId();
    createADocument(contact);
  };

  const createADocument = async (contact) => {
    try {
      await setDoc(doc(firestore, 'contact', contact.id), contact);

      window.notify('Your message has been sent', 'success');

      setState(initialState);
    } catch (err) {
      console.error(err);
      window.notify('Something went wrong, message not sent', 'error');
    }
  };

  return (
    <div className='contact'>
      <div className="contact-item">
        <h1>Contact</h1>
        <form onSubmit={handleSubmit}>
          <div className='inputs'>
            <input
              type="email"
              placeholder='Your E-mail'
              name='email'
              value={state.email} 
              onChange={handleChange}
            />
            <input
              type="text"
              placeholder='How Can We help You?'
              name='description'
              className='message'
              value={state.description} 
              onChange={handleChange}
            />
            <input type="submit" value="Submit" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Contact;
