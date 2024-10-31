import React from 'react'
import { Link } from 'react-router-dom'
import lightFacebook from '../../../Assets/light_facebook.png'
import darkFacebook from '../../../Assets/dark_facebook.png'
import lightInstagram from '../../../Assets/light_instagram.png'
import darkInstagram from '../../../Assets/dark_instagram.png'
import lightPinterest from '../../../Assets/light_pintrest.png'
import darkPinterest from '../../../Assets/dark_pintrest.png'
import hero from '../../../Assets/slid1.png'

export default function Hero({ mode }) {
  return (
    <div className='hero'>
        <div className="hero-left">
        <h3>Show Your Favorite Watches</h3>
        <h1>SHOP JEWELLERY FOR</h1>
        <h1>EVERY OCCASION</h1>
        <p>Treat yourself or the lady in your life to a fabulous piece from our
            extensive women's jewellery collection. Our diverse range of earrings,
            bracelets, rings, necklaces, and charms spans the full fashion spectrum,
            from timeless classic pieces to contemporary, cutting-edge models.
            With an impressive selection from some of the world's most iconic designers.</p>
            <Link to='/men'><button>Show Watches</button></Link>
            <div className="social">
                <img src={mode==='light'?darkFacebook:lightFacebook} alt="" />
                <img src={mode==='light'?darkInstagram:lightInstagram} alt="" />
                <img src={mode==='light'?darkPinterest:lightPinterest} alt="" />
            </div>
        </div>
        <div className="hero-right">
            <img src={hero} alt="" />
        </div>
    </div>
  )
}
