import React, { useState } from 'react';

const Card = ({id, image, title, toggleCart, dispatchType, btnText}) => {

    const [loaded, setLoaded] = useState(false);

    return (
        <div className="card">
            <img src={`https://image.tmdb.org/t/p/w500/${image}`} alt={image} className="card__image" style={loaded ? {display: 'block'} : { display: 'none'}} onLoad={() => setLoaded(true)}/>
            <div className="card__overlay">
                <h1 className="card__title">{title}</h1>
                <button className="btn" data-id={id}
                        onClick={e => toggleCart({type: dispatchType, payload: e.target.dataset.id})}>{btnText}</button>
            </div>
        </div>
    )
}

export default Card;