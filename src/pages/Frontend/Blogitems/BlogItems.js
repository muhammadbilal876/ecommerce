import React from 'react'
import calender from '../../../Assets/calendar.png'

export default function BlogItems({name, image, date}) {
  return (
    <div className='blogItem'>
        <div className="blog-cards">
            <img src={image} alt="" className='blog-image'/>
            <div className="info">
                <span>
                    <img src={calender} alt="" />
                    <h3>{date}</h3>
                </span>
                <h2>{name}</h2>
                <a href="#">READ MORE</a>
            </div>
        </div>
    </div>
  )
}
