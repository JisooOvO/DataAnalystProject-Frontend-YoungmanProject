import { useState } from "react";
import "../../css/Carousel.css"

const Carousel = ({ images }) => {

    const [current, setCurrent] = useState(0);
    const length = images.length;

    const nextSlide = () => {
        setCurrent(current === length - 1 ? 0 : current + 1);
    };

    const prevSlide = () => {
        setCurrent(current === 0 ? length - 1 : current - 1);
    };

    if (!Array.isArray(images) || images.length <= 0) {
        return null;
    }

    return (
        <div className="carousel">
            <span className="left-arrow" onClick={prevSlide}>◀</span>
            <span className="right-arrow" onClick={nextSlide}>▶</span>
            {images.map((item, index) => (
                <div className={index === current ? "slide active" : "slide"} key={index}>
                {index === current && (
                    <>
                    <img src={item.src} alt="travel image" className='image' />
                    <div className="image-text">{item.text}</div>
                    </>
                    )}
               </div>
            ))}
        </div>
    )
}

export default Carousel
