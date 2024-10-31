import React from 'react'
import blog from '../../../Assets/Blog'
import BlogItems from '../Blogitems/BlogItems'

export default function Blog() {
  return (
    <div className='blog'>
        <h3>LATEST NEWS</h3>
        <h1>Watches New Trends</h1>
        <div className="blog-card">
            {blog.map((blog, i) => {
                return <BlogItems key={i} name={blog.name} image={blog.img} date={blog.date}/>
            })}
        </div>
    </div>
  )
}
