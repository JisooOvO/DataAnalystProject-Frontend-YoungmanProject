import { useEffect, useState } from "react";
import "../../css/Carousel.css"

const Carousel = ({ images, onSelect }) => {

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
        <div className="relative mx-auto overflow-hidden">
            <span className="absolute top-[40%] transform -translate-y-1/2 text-3xl z-10 cursor-pointer select-none left-0" onClick={prevSlide}>◀</span>
            <span className="absolute top-[40%] transform -translate-y-1/2 text-3xl z-10 cursor-pointer select-none right-0" onClick={nextSlide}>▶</span>
            {images.map((item, index) => (
                <div className={index === current ? "slide active" : "slide"} 
                     key={index}
                     onClick={() => onSelect(index)}
                     >
                {index === current && (
                    <>
                    <img src={item.src} alt="menu_image" className="w-[100%] h-auto" />
                    <div className="image-text">{item.text}</div>
                    </>
                    )}
               </div>
            ))}
        </div>
    )
}

export default Carousel
