import React, { useContext } from 'react';
import { AuthContext } from '../../../context/Context'; 
import starIcon from '../../../Assets/star_icon.png';
import starDull from '../../../Assets/star_dull_icon.png';

export default function ProductDisplay(props) {
    const { product } = props;
    const { addToCart } = useContext(AuthContext); 
    const handleAddToCart = () => {
        addToCart(product.id); 
    };

    return (
        <div className='display'>
            <div className="left-part">
                <div className="slide">
                    <img src={product.image} alt={product.name} className='main' /> {/* Updated alt text */}
                </div>
            </div>
            <div className="right-part">
                <h1>{product.name}</h1>
                <div className="star">
                    <img src={starIcon} alt="Filled star icon" /> {/* Updated alt text */}
                    <img src={starIcon} alt="Filled star icon" />
                    <img src={starIcon} alt="Filled star icon" />
                    <img src={starIcon} alt="Filled star icon" />
                    <img src={starDull} alt="Dull star icon" /> {/* Updated alt text */}
                    <span>{125}</span>
                </div>
                <p className='desc-product'>Lorem ipsum dolor sit amet consectetur adipisicing elit...</p>
                <div className="size">
                    <h2>Select Size</h2>
                    <ul>
                        <li>S</li>
                        <li>M</li>
                        <li>L</li>
                        <li>XL</li>
                        <li>XXL</li>
                    </ul>
                </div>
                <button onClick={handleAddToCart}>ADD TO CART</button>
                <div className="categ">
                    <h4>Category: <span>{product.category}-Watches</span></h4>
                    <h4>Tags: <span>Modern, Latest</span></h4>
                </div>
            </div>
        </div>
    );
}
