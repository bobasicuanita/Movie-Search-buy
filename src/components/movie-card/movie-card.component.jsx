import React, {useState} from 'react';

const Card = ({id, image, title, rating, toggleCart, dispatchType, btnText}) => {

    // Show Image when it is loaded to prevent showing the layout.
    const [loaded, setLoaded] = useState(false);

    const width = rating * 10 + '%';

    return (
        <div className="card">
            <img src={`https://image.tmdb.org/t/p/w500/${image}`} alt={image} className="card__image"
                 style={loaded ? {display: 'block'} : {display: 'none'}} onLoad={() => setLoaded(true)}/>
            <div className="card__overlay">
                <div className="card__info">
                    <h1 className="card__title">{title}</h1>
                    <div className="card__rating">
                        <div className="card__rating-top" style={{ width }}>
                            <span>★</span>
                            <span>★</span>
                            <span>★</span>
                            <span>★</span>
                            <span>★</span>
                        </div>
                        <div className="card__rating-bottom">
                            <span>★</span>
                            <span>★</span>
                            <span>★</span>
                            <span>★</span>
                            <span>★</span>
                        </div>
                    </div>
                    <span className='card__rating-number'>{rating} / 10</span>
                </div>

                <button className="btn" data-id={id}
                        onClick={e => toggleCart({type: dispatchType, payload: e.target.dataset.id})}>{btnText}</button>
            </div>
        </div>
    )
}

export default Card;