import React, { useState, useEffect } from 'react'
import soldeWatches from '../../../Assets/slid1.png'

const initialState = {days: 0, hours: 0, minutes: 0, seconds: 0,}

export default function Sold() {

    const [timeLeft, setTimeLeft] = useState(initialState)
    const targetDate = new Date("December 31, 2024 23:59:59").getTime();
    
    useEffect(() => {
        const updateCountdown = () => {
          const now = new Date().getTime();
          const difference = targetDate - now;
    
          if (difference > 0) {
            const days = Math.floor(difference / (1000 * 60 * 60 * 24));
            const hours = Math.floor(
              (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
            );
            const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((difference % (1000 * 60)) / 1000);
    
            setTimeLeft({ days, hours, minutes, seconds });
          } else {
            // Timer has expired
            setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
          }
        };
    
        const intervalId = setInterval(updateCountdown, 1000);
    
        return () => clearInterval(intervalId);
      }, [targetDate]);
    
  return (
    <div className='solde'>
        <div className="sold">
            <div className="header">
                <h1>Watches Hot</h1>
                <h1 className='act'>Watches Collection</h1>
                <h1>Accessories</h1>
            </div>
            <div className="image">
                <img src={soldeWatches} alt="" />
            </div>
            <div className="timer">
                <h3>DEEL OF THE WEEK</h3>
                <h1>Multi-pocket Chest Watches Black</h1>
                <div className="time">
                    <span>
                        <h2>{timeLeft.days}</h2>
                        <h4>Days</h4>
                    </span>
                    <span>
                        <h2>{timeLeft.hours}</h2>
                        <h4>Hours</h4>
                    </span>
                    <span>
                        <h2>{timeLeft.minutes}</h2>
                        <h4>Minutes</h4>
                    </span>
                    <span>
                        <h2>{timeLeft.seconds}</h2>
                        <h4>Seconds</h4>
                    </span>
                </div>
                <button>Shop Now</button>
            </div>
        </div>
    </div>
  )
}
